import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import OT from "@opentok/client";
import AgentCatalog from "../../components/AgentCatalog";
import TourComparisonModal from "../../components/Compare/TourComparisonModal";
import { useComparePackages } from "../../hooks/useComparePackages";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  UploadFile,
  ScreenShare,
  StopScreenShare,
  Description,
  CallEnd,
  Close as CloseIcon,
  Cast,
  CardTravel,
  Compare as CompareIcon,
} from "@mui/icons-material";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { Document, Page, pdfjs } from "react-pdf";
import { samplePackageData } from "../../data/samplePackageData";
import { agentPackageService } from "../../services/AgentPackageService";
import { openTokSessionSingleton } from "../../services/OpenTokSessionManager";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const ENABLE_AGENT_VIDEO = import.meta.env.VITE_AGENT_ENABLE_VIDEO === "true";
const ENABLE_AGENT_AUDIO = import.meta.env.VITE_AGENT_ENABLE_AUDIO === "true";

// Use centralized package data
const tourPackages = samplePackageData;

const MeetingPage = ({ sessionId, onCallEnd }) => {
  const [hasRemoteStream, setHasRemoteStream] = useState(false);
  const [localVideoOn, setLocalVideoOn] = useState(ENABLE_AGENT_VIDEO);
  const [localAudioOn, setLocalAudioOn] = useState(ENABLE_AGENT_AUDIO);
  const [remoteVideoOn, setRemoteVideoOn] = useState(false);
  const [remoteUserName, setRemoteUserName] = useState("Customer");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [hasVideoInput, setHasVideoInput] = useState(false);
  const [hasAudioInput, setHasAudioInput] = useState(false);
  const [videoAssistActive, setVideoAssistActive] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [customerFileUrl, setCustomerFileUrl] = useState(null);
  const [customerFileDialogOpen, setCustomerFileDialogOpen] = useState(false);
  const [customerFileName, setCustomerFileName] = useState(null);
  const [waitingForSignedDoc, setWaitingForSignedDoc] = useState(false);
  const [signedDocUrl, setSignedDocUrl] = useState(null);
  const [signedDocName, setSignedDocName] = useState(null);
  const [signedDocDialogOpen, setSignedDocDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCustomerLeftPopup, setShowCustomerLeftPopup] = useState(false);
  const [isCobrowsing, setIsCobrowsing] = useState(false);
  const [openCoBrowseDialog, setOpenCoBrowseDialog] = useState(false);
  const [coBrowseUrl, setCoBrowseUrl] = useState("");

  // Packages state
  const [packagesDialogOpen, setPackagesDialogOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [sharedPackages, setSharedPackages] = useState([]);
  const [sharedComparisonOpen, setSharedComparisonOpen] = useState(false);
  
  // Package sharing progress state
  const [isSharingPackages, setIsSharingPackages] = useState(false);
  const [sharingProgress, setSharingProgress] = useState(0);
  const [sharingStatus, setSharingStatus] = useState('');

  const fileInputRef = useRef(null);
  const sessionRef = useRef(null);
  const publisherRef = useRef(null);
  const subscriberRef = useRef(null);
  const webcamPublisherRef = useRef(null);
  const screenPublisherRef = useRef(null);
  const publisherContainerRef = useRef(null);

  // Comparison functionality
  const {
    compareList,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCompare,
    clearComparison,
    getBestValue
  } = useComparePackages('agent');

  const ensureMediaAccess = async () => {
    if (!ENABLE_AGENT_VIDEO && !ENABLE_AGENT_AUDIO) return true;
    await navigator.mediaDevices.getUserMedia({
      video: ENABLE_AGENT_VIDEO,
      audio: ENABLE_AGENT_AUDIO,
    });
    return true;
  };

  // Initialize session on mount
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let isMounted = true;

    async function initSession() {
      try {
        const res = await axios.post(`${backendUrl}/api/opentok-token`, {
          sessionId,
          userType: "publisher",
          userData: { name: "Agent" },
        });

        const { apiKey, token } = res.data;
        if (!isMounted) return;

        const session = OT.initSession(apiKey, sessionId);
        sessionRef.current = session;

        // Initialize the singleton with the session
        console.log("🔌 Initializing OpenTok session singleton",session);
        openTokSessionSingleton.initialize(session);

        session.connect(token, async (err) => {
          if (err) {
            console.error("❌ Session connect error:", err);
            return;
          }
          console.log("✅ Agent connected to session");

          try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInput = devices.some((d) => d.kind === "videoinput");
            const audioInput = devices.some((d) => d.kind === "audioinput");

            setHasVideoInput(videoInput);
            setHasAudioInput(audioInput);
            setLocalVideoOn(ENABLE_AGENT_VIDEO && videoInput);
            setLocalAudioOn(ENABLE_AGENT_AUDIO && audioInput);

            if (
              (ENABLE_AGENT_VIDEO && videoInput) ||
              (ENABLE_AGENT_AUDIO && audioInput)
            ) {
              await ensureMediaAccess();
            }

            const publisherOptions = {
              insertMode: "append",
              width: "100%",
              height: "100%",
              name: "Agent",
              videoSource: ENABLE_AGENT_VIDEO && videoInput ? undefined : null,
              audioSource: ENABLE_AGENT_AUDIO && audioInput ? undefined : null,
              video: ENABLE_AGENT_VIDEO && videoInput,
              audio: ENABLE_AGENT_AUDIO && audioInput,
              showControls: false, // Hide default OpenTok controls
            };

            const webcamPublisher = OT.initPublisher(
              publisherContainerRef.current,
              publisherOptions,
              (pubErr) => {
                if (pubErr) {
                  console.error("Publisher init error:", pubErr);
                } else {
                  webcamPublisherRef.current = webcamPublisher;
                  publisherRef.current = webcamPublisher;

                  session.publish(webcamPublisher, (pubErr2) => {
                    if (pubErr2) {
                      console.error("Publish error:", pubErr2);
                    }
                  });

                  // Send call acceptance signal
                  openTokSessionSingleton.sendSignal(
                    {
                      type: "callAccepted",
                      data: "Agent accepted the call",
                    },
                    (err) => {
                      if (err) console.error("Signal error:", err);
                    }
                  );
                }
              }
            );

            webcamPublisher.on("streamCreated", (e) => {
              setShowCustomerLeftPopup(false);
              setLocalVideoOn(e.stream.hasVideo);
            });
          } catch (mediaErr) {
            console.error("Media error:", mediaErr);
            if (mediaErr.name === "NotReadableError") {
              //setRetryMedia(true);
            }
          }
        });

        // Set up session event handlers
        session.on("streamCreated", (event) => {
          setHasRemoteStream(true);
          setRemoteVideoOn(event.stream.hasVideo);
          setRemoteUserName(event.stream.name);

          // Mark customer as active
          setShowCustomerLeftPopup(false);

          const subscriber = session.subscribe(
            event.stream,
            subscriberRef.current,
            {
              insertMode: "append",
              width: "100%",
              height: "100%",
              showControls: false, // Hide default OpenTok controls
            },
            (err) => {
              if (err) {
                console.error("Subscribe error:", err);
              }
            }
          );

          subscriber.on("videoEnabled", () => {
            setRemoteVideoOn(true);
          });

          subscriber.on("videoDisabled", () => {
            setRemoteVideoOn(false);
          });
        });

        session.on("streamDestroyed", (event) => {
          const stream = event.stream;
          const reason = event.reason;

          console.log("🔌 Stream destroyed:", {
            reason,
            streamId: stream?.streamId,
            isPageVisible: !document.hidden
          });

          setHasRemoteStream(false);
          setRemoteVideoOn(false);

          // If page is hidden (tab switched), don't immediately show customer left popup
          if (document.hidden) {
            console.log("📱 Page hidden during stream destroyed - likely tab switch, not showing customer left");
            return;
          }

          // Add a delay before showing "customer left" to handle temporary disconnections
          setTimeout(() => {
            console.log("⏰ Customer left timeout triggered - showing popup");
            setShowCustomerLeftPopup(true);
          }, 5000); // 5 second delay
        });

        session.on("connectionDestroyed", (event) => {
          console.log("🔌 Connection destroyed:", event.reason);
        });

        session.on("exception", (e) => console.error("⚠️ OpenTok exception:", e));

      } catch (err) {
        console.error("❌ Session initialization error:", err);
      }
    }

    initSession();

    return () => {
      isMounted = false;
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
    };
  }, [sessionId]);

  // Start or stop co-browsing
  const toggleCobrowsing = async () => {
    if (isCobrowsing) {
      setIsCobrowsing(false);
      setCoBrowseUrl("");
      setOpenCoBrowseDialog(false);
    } else {
      const session = openTokSessionSingleton.getSession();
      if (session) {
        openTokSessionSingleton.sendSignal(
          {
            type: "request-cobrowsing-url",
          },
          (err) => {
            if (err) {
              console.error("❌ Signal error:", err);
              setIsCobrowsing(false);
              setCoBrowseUrl("");
              setOpenCoBrowseDialog(false);
            }
          }
        );
      }
    }
  };

  const toggleVideo = async () => {
    const pub = webcamPublisherRef.current;
    if (!pub || !hasVideoInput || isScreenSharing) return;

    if (!localVideoOn) {
      const granted = await ensureMediaAccess();
      if (!granted) return;
    }

    try {
      pub.publishVideo(!localVideoOn);
      setLocalVideoOn(!localVideoOn);
    } catch (err) {
      console.error("Video toggle failed:", err);
    }
  };

  const toggleAudio = () => {
    const pub = webcamPublisherRef.current;
    if (!pub || !hasAudioInput || isScreenSharing) return;

    try {
      pub.publishAudio(!localAudioOn);
      setLocalAudioOn(!localAudioOn);
    } catch (err) {
      console.error("Audio toggle failed:", err);
    }
  };

  const initWebcamPublisher = (callback) => {
    if (!sessionRef.current || !publisherContainerRef.current) return;

    const publisherOptions = {
      insertMode: "append",
      width: "100%",
      height: "100%",
      name: "Agent",
      videoSource: ENABLE_AGENT_VIDEO && hasVideoInput ? undefined : null,
      audioSource: ENABLE_AGENT_AUDIO && hasAudioInput ? undefined : null,
      video: ENABLE_AGENT_VIDEO && hasVideoInput,
      audio: ENABLE_AGENT_AUDIO && hasAudioInput,
      showControls: false, // Hide default OpenTok controls
    };

    const newWebcamPublisher = OT.initPublisher(
      publisherContainerRef.current,
      publisherOptions,
      (err) => {
        if (err) {
          console.error("Webcam publisher init error:", err);
          if (callback) callback(err);
          return;
        }

        webcamPublisherRef.current = newWebcamPublisher;
        publisherRef.current = newWebcamPublisher;

        sessionRef.current.publish(newWebcamPublisher, (pubErr) => {
          if (pubErr) {
            console.error("Publish webcam error:", pubErr);
          }
          if (callback) callback(pubErr);
        });
      }
    );
  };

  const toggleScreenShare = async () => {
    const session = openTokSessionSingleton.getSession();
    if (!session) return;

    if (isScreenSharing) {
      // Stop screen sharing
      if (screenPublisherRef.current) {
        session.unpublish(screenPublisherRef.current);
        screenPublisherRef.current.destroy();
        screenPublisherRef.current = null;
      }

      // Re-init webcam publisher
      initWebcamPublisher((err) => {
        if (!err) {
          setIsScreenSharing(false);
          setLocalVideoOn(true);
        }
      });
    } else {
      // Start screen sharing

      // Unpublish webcam before screen share
      if (webcamPublisherRef.current) {
        session.unpublish(webcamPublisherRef.current);
        webcamPublisherRef.current.destroy();
        webcamPublisherRef.current = null;
      }

      const screenPublisher = OT.initPublisher(
        publisherContainerRef.current,
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
          videoSource: "screen",
          audioSource: null,
          publishAudio: false,
          showControls: false, // Hide default OpenTok controls
        },
        (err) => {
          if (err) {
            console.error("Screen publisher init error:", err);
            // Try to re-publish webcam if screen share fails
            if (webcamPublisherRef.current) {
              session.publish(webcamPublisherRef.current);
            }
            return;
          }

          screenPublisherRef.current = screenPublisher;

          // Listen for user manually stopping screen share
          screenPublisher.on("mediaStopped", () => {
            if (session && screenPublisherRef.current) {
              session.unpublish(screenPublisherRef.current);
              screenPublisherRef.current.destroy();
              screenPublisherRef.current = null;
            }

            // Re-init webcam publisher
            initWebcamPublisher((err) => {
              if (!err) {
                setIsScreenSharing(false);
                setLocalVideoOn(true);
              }
            });
          });

          // Publish screen share
          session.publish(screenPublisher, (pubErr) => {
            if (pubErr) {
              console.error("Screen publish error:", pubErr);
              // Fallback: republish webcam
              if (webcamPublisherRef.current) {
                session.publish(webcamPublisherRef.current);
              }
              return;
            }

            setIsScreenSharing(true);
            setLocalVideoOn(false);
          });
        }
      );
    }
  };

  const handleVideoAssist = () => {
    const session = openTokSessionSingleton.getSession();
    if (!session) return;

    const nextState = !videoAssistActive;
    openTokSessionSingleton.sendSignal(
      {
        type: "video-assist",
        data: nextState ? "enable-video" : "disable-video",
      },
      (err) => {
        if (err) {
          console.error("Signal error:", err);
        } else {
          setVideoAssistActive(nextState);
        }
      }
    );
  };

  const handleEndCall = async () => {
    const session = openTokSessionSingleton.getSession();
    if (session) {
      openTokSessionSingleton.sendSignal(
        { type: "endCall", data: "Agent ended the call" },
        (err) => {
          if (err) console.error("Signal send error:", err);
        }
      );
      session.disconnect();
    }

    onCallEnd();
  };

  const handleCloseFileDialog = () => {
    const session = openTokSessionSingleton.getSession();
    if (session) {
      openTokSessionSingleton.sendSignal(
        {
          type: "file-preview-closed",
          data: "Agent closed the file preview",
        },
        (err) => {
          if (err) console.error("Signal send error:", err);
        }
      );
    }

    setCustomerFileUrl(null);
    setCustomerFileDialogOpen(false);
  };

  const getFileType = (url, name) => {
    const extension = name?.split(".").pop().toLowerCase();

    if (!extension) return "unknown";

    if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(extension))
      return "image";

    if (["mp4", "webm", "ogg", "mov", "avi"].includes(extension))
      return "video";

    if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return "audio";

    if (["pdf"].includes(extension)) return "pdf";

    return "unknown";
  };

  const handleDownloadAndSignal = async () => {
    if (!signedDocUrl) return;

    try {
      const response = await fetch(signedDocUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = signedDocName || "downloaded-file";
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.warn("Direct download failed, opening file in new tab:", error);
      window.open(signedDocUrl, "_blank", "noopener,noreferrer");
    }
  };

  const renderFallbackAvatar = (label = "You") => (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.800",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: "grey.700",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="white">
          {label[0]?.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );

  const isAnyDialogOpen =
    uploadDialogOpen ||
    customerFileDialogOpen ||
    signedDocDialogOpen ||
    waitingForSignedDoc ||
    isUploading;

  const ActivityToolbar = () => (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(216, 216, 216, 0.6)",
        borderRadius: 3,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        gap: 1,
        p: 1,
        zIndex: 9999,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <Tooltip title={localVideoOn ? "Turn off video" : "Turn on video"}>
        <span>
          <IconButton
            onClick={toggleVideo}
            sx={{ color: "white" }}
            disabled={isScreenSharing || !hasVideoInput}
          >
            {localVideoOn ? <Videocam /> : <VideocamOff />}
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={localAudioOn ? "Turn off audio" : "Turn on audio"}>
        <span>
          <IconButton
            onClick={toggleAudio}
            sx={{ color: "white" }}
            disabled={!hasAudioInput}
          >
            {localAudioOn ? <Mic /> : <MicOff />}
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Enable Video Assist">
        <span>
          <IconButton
            onClick={handleVideoAssist}
            sx={{ color: videoAssistActive ? "lime" : "white" }}
          >
            <VideoFileIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}>
        <IconButton
          onClick={toggleScreenShare}
          sx={{ color: "white" }}
          disabled={isAnyDialogOpen}
        >
          {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
        </IconButton>
      </Tooltip>

      <Tooltip title={isCobrowsing ? "Stop Co-browsing" : "Start Co-browsing"}>
        <IconButton
          onClick={toggleCobrowsing}
          sx={{ color: isCobrowsing ? "lime" : "white" }}
          disabled={isAnyDialogOpen}
        >
          <Cast />
        </IconButton>
      </Tooltip>

      <Tooltip title="Upload File">
        <IconButton
          component="label"
          sx={{ color: "white" }}
          disabled={isAnyDialogOpen}
        >
          <UploadFile onClick={() => setUploadDialogOpen(true)} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Browse Tour Packages">
        <IconButton
          onClick={async () => {
            console.log("🎭 Agent clicked 'Browse Tour Packages'");
            setPackagesDialogOpen(true);
            // Send signal to customer to open their shared packages dialog
            const session = openTokSessionSingleton.getSession();
            console.log("🔌 Session in handleBrowseTourPackages",session);
            if (session) {
              console.log("📡 Sending signal to customer to open shared packages dialog");
              await openTokSessionSingleton.sendSignal({
                type: "agent-request-shared-packages",
                data: JSON.stringify({
                  action: "open-shared-packages-dialog",
                  timestamp: new Date().toISOString(),
                }),
              });
            }
          }}
          sx={{ color: "white" }}
          disabled={isAnyDialogOpen}
        >
          <CardTravel />
        </IconButton>
      </Tooltip>

      {/* Shared Packages Comparison */}
      {sharedPackages.length > 0 && (
        <Tooltip title={`Compare ${sharedPackages.length} shared packages`}>
          <IconButton
            onClick={openSharedComparison}
            sx={{
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
            disabled={isAnyDialogOpen}
          >
            <CompareIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Upload & Send Document for Signing">
        <IconButton
          onClick={() => {
            fileInputRef.current.dataset.intent = "sign";
            fileInputRef.current.setAttribute("accept", ".pdf,.jpg,.jpeg,.png"); // ← restrict for signing
            fileInputRef.current.click();
          }}
          sx={{ color: "white" }}
          disabled={isAnyDialogOpen}
        >
          <Description />
        </IconButton>
      </Tooltip>

      <Tooltip title="End Call">
        <IconButton onClick={handleEndCall} sx={{ color: "red" }}>
          <CallEnd />
        </IconButton>
      </Tooltip>
    </Box>
  );

  // Packages functions
  const handlePackageSelect = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const clearSelectedPackages = () => {
    setSelectedPackages([]);
  };

  const shareSelectedPackages = async () => {
    if (selectedPackages.length === 0) {
      alert("Please select at least one package to share.");
      return;
    }

    if (isSharingPackages) {
      alert("Package sharing is already in progress. Please wait...");
      return;
    }

    const packagesToShare = tourPackages.filter((pkg) =>
      selectedPackages.includes(pkg.id)
    );

    // Calculate total value of shared packages
    const totalValue = packagesToShare.reduce((sum, pkg) => sum + pkg.price, 0);

    setIsSharingPackages(true);
    setSharingProgress(0);
    setSharingStatus(`Preparing to share ${packagesToShare.length} packages...`);

    try {
      await agentPackageService.sendPackages(
        packagesToShare,
        {
          onProgress: (progress, sentChunks, totalChunks) => {
            setSharingProgress(progress);
            setSharingStatus(`Sending packages: ${sentChunks}/${totalChunks} chunks (${progress.toFixed(1)}%)`);
            console.log(`📦 Agent sending progress: ${progress.toFixed(1)}% (${sentChunks}/${totalChunks})`);
          },
          onComplete: () => {
            console.log(`✅ Successfully shared ${packagesToShare.length} packages worth $${totalValue.toLocaleString("en-US")}`);
            
            // Add shared packages to the list for comparison
            setSharedPackages(prev => {
              const newPackages = [...prev];
              packagesToShare.forEach(pkg => {
                if (!newPackages.find(existing => existing.id === pkg.id)) {
                  newPackages.push(pkg);
                }
              });
              return newPackages;
            });

            setSharingStatus(`✅ Successfully shared ${packagesToShare.length} packages!`);
            
            // Reset sharing state after a short delay
            setTimeout(() => {
              setIsSharingPackages(false);
              setSharingProgress(0);
              setSharingStatus('');
            }, 2000);
          },
          onError: (error) => {
            console.error("📦 Package share error:", error);
            setSharingStatus(`❌ Failed to share packages: ${error.message}`);
            alert(`Failed to share packages: ${error.message}`);
            
            // Reset sharing state after error
            setTimeout(() => {
              setIsSharingPackages(false);
              setSharingProgress(0);
              setSharingStatus('');
            }, 3000);
          },
          useChunking: 'auto' // Automatically determine if chunking is needed
        }
      );
    } catch (error) {
      console.error("📦 Error initiating package share:", error);
      setSharingStatus(`❌ Error: ${error.message}`);
      alert(`Error: ${error.message}`);
      
      // Reset sharing state
      setIsSharingPackages(false);
      setSharingProgress(0);
      setSharingStatus('');
    }
  };

  const openSharedComparison = () => {
    setSharedComparisonOpen(true);

    // Sync shared comparison with customer
    const session = openTokSessionSingleton.getSession();
    if (session && sharedPackages.length > 0) {
      openTokSessionSingleton.sendSignal(
        {
          type: "shared-comparison-open",
          data: JSON.stringify({
            action: "agent-opened-comparison",
            sharedPackages: sharedPackages,
            timestamp: new Date().toISOString(),
          }),
        },
        (err) => {
          if (err) {
            console.error("Failed to send shared comparison signal:", err);
          }
        }
      );
    }
  };


  const uploadFileAndSignal = async (file, type = "preview") => {
    if (!file) return;

    const extension = file.name?.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png"].includes(extension);
    const isPdf = extension === "pdf";

    if (type === "sign" && !isPdf && !isImage) {
      alert("Only PDF or image files (JPG, PNG) can be sent for signing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true); // ⬅️ START LOADER
    try {
      const res = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFileUrl = res.data.url;
      const signalType = type === "sign" ? "file-for-signing" : "file-preview";

      const session = openTokSessionSingleton.getSession();
      if (session) {
        openTokSessionSingleton.sendSignal(
          {
            type: signalType,
            data: JSON.stringify({
              name: file.name,
              url: uploadedFileUrl,
            }),
          },
          (err) => {
            if (err) {
              console.error("Signal send error:", err);
            } else {
              if (type === "sign") {
                setWaitingForSignedDoc(true);
              } else {
                setCustomerFileUrl(uploadedFileUrl);
                setCustomerFileName(file.name);
                setCustomerFileDialogOpen(true);
              }
            }
          }
        );
      }
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setIsUploading(false); // ⬅️ STOP LOADER
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100vh",
        bgcolor: "grey.900",
        display: "flex",
        flexDirection: "column",
        p: 2,
        position: "relative",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
        {/* Agent Video */}
        <Box
          sx={{
            flex: videoAssistActive ? 0 : hasRemoteStream ? 1 : 1,
            width: videoAssistActive ? "0%" : hasRemoteStream ? "50%" : "100%",
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "black",
            transition: "all 0.3s ease",
            visibility: videoAssistActive ? "hidden" : "visible",
          }}
        >
          <div
            ref={publisherContainerRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
          {!localVideoOn && !isScreenSharing && renderFallbackAvatar("You")}
          <Typography
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              bgcolor: "black",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              zIndex: 2,
            }}
          >
            You
          </Typography>
        </Box>

        {/* Customer Video */}
        <Box
          sx={{
            flex: videoAssistActive ? 1 : hasRemoteStream ? 1 : 0,
            width: videoAssistActive ? "100%" : hasRemoteStream ? "50%" : "0%",
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "black",
            visibility:
              hasRemoteStream || videoAssistActive ? "visible" : "hidden",
            transition: "all 0.3s ease",
          }}
        >
          <div
            ref={subscriberRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
          {!remoteVideoOn && renderFallbackAvatar(remoteUserName)}
          <Typography
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              bgcolor: "black",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              zIndex: 2,
            }}
          >
            Customer
          </Typography>
        </Box>
      </Box>

      <ActivityToolbar />

      <input
        type="file"
        accept="*/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files[0];
          const intent = e.target.dataset.intent || "preview";

          if (file) {
            await uploadFileAndSignal(
              file,
              intent === "sign" ? "sign" : "preview"
            );
          }

          e.target.value = "";
          delete e.target.dataset.intent;
        }}
      />

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Select Upload Type</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            onClick={() => {
              setUploadDialogOpen(false);
              fileInputRef.current.click();
            }}
            sx={{ m: 1 }}
          >
            Agent Upload
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setUploadDialogOpen(false);
              const session = openTokSessionSingleton.getSession();
              if (session) {
                openTokSessionSingleton.sendSignal(
                  {
                    type: "file-request",
                    data: "Please upload your file.",
                  },
                  (err) => {
                    if (err) console.error("Signal error:", err);
                  }
                );
              } else {
                console.log("❌ No session available");
              }
            }}
            sx={{ m: 1 }}
          >
            Request Customer Upload
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={customerFileDialogOpen}
        onClose={handleCloseFileDialog}
        aria-labelledby="uploaded-file-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="uploaded-file-dialog-title">File Preview</DialogTitle>
        <DialogContent dividers>
          {customerFileUrl ? (
            (() => {
              const fileType = getFileType(customerFileUrl, customerFileName);

              switch (fileType) {
                case "image":
                  return (
                    <img
                      src={customerFileUrl}
                      alt={customerFileName}
                      style={{
                        width: "100%",
                        maxHeight: 600,
                        objectFit: "contain",
                      }}
                    />
                  );
                case "video":
                  return (
                    <video
                      src={customerFileUrl}
                      controls
                      style={{ width: "100%", maxHeight: 600 }}
                    />
                  );
                case "audio":
                  return (
                    <audio
                      src={customerFileUrl}
                      controls
                      style={{ width: "100%" }}
                    />
                  );
                case "pdf":
                  return (
                    <iframe
                      src={customerFileUrl}
                      title="Uploaded PDF Preview"
                      width="100%"
                      height="600px"
                      style={{ border: "none" }}
                    />
                  );
                default:
                  return (
                    <Typography>
                      Preview not available for this file type.{" "}
                      <a
                        href={customerFileUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click here to download.
                      </a>
                    </Typography>
                  );
              }
            })()
          ) : (
            <Typography color="error">Preview not available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFileDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={waitingForSignedDoc}
        onClose={() => { }}
        disableEscapeKeyDown
      >
        <DialogTitle>Waiting for Signed Document</DialogTitle>
        <DialogContent>
          <Typography>
            Document uploaded. Waiting for the customer to sign and send back...
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={signedDocDialogOpen}
        onClose={() => setSignedDocDialogOpen(false)}
        maxWidth="md"
        fullWidth
        aria-labelledby="signed-doc-dialog-title"
      >
        <DialogTitle id="signed-doc-dialog-title">
          Signed Document Preview
        </DialogTitle>
        <DialogContent dividers>
          {signedDocUrl ? (
            (() => {
              const fileType = getFileType(signedDocUrl, signedDocName);

              switch (fileType) {
                case "image":
                  return (
                    <img
                      src={signedDocUrl}
                      alt={signedDocName}
                      style={{
                        width: "100%",
                        maxHeight: 600,
                        objectFit: "contain",
                      }}
                    />
                  );
                case "pdf":
                  return (
                    <iframe
                      src={signedDocUrl}
                      title="Uploaded PDF Preview"
                      width="100%"
                      height="600px"
                      style={{ border: "none" }}
                    />
                  );
                default:
                  return (
                    <Typography>
                      Preview not available for this file type.
                      <a href={signedDocUrl} target="_blank" rel="noreferrer">
                        Click here to download.
                      </a>
                    </Typography>
                  );
              }
            })()
          ) : (
            <Typography color="error">Preview not available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {signedDocUrl && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadAndSignal}
            >
              Download
            </Button>
          )}
          <Button onClick={() => setSignedDocDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isUploading} onClose={() => { }} disableEscapeKeyDown>
        <DialogTitle>Uploading File...</DialogTitle>
        <DialogContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress />
          <Typography>Please wait while the file is being uploaded.</Typography>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showCustomerLeftPopup}
        onClose={() => setShowCustomerLeftPopup(false)}
        aria-labelledby="customer-left-dialog-title"
      >
        <DialogTitle id="customer-left-dialog-title">
          Customer Disconnected
        </DialogTitle>
        <DialogContent>
          <Typography>The customer has left the session.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEndCall} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCoBrowseDialog}
        onClose={toggleCobrowsing}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Cobrowse Session</DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <iframe
            src={coBrowseUrl}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="Cobrowse Session"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCobrowsing}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Packages Dialog with Co-browsing */}
      <Dialog
        open={packagesDialogOpen}
        onClose={() => setPackagesDialogOpen(false)}
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "90vh",
            maxHeight: "95vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <CardTravel />
          Agent Catalog - Co-browsing Enabled
          {selectedPackages.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <Chip
                label={`${selectedPackages.length} selected`}
                size="small"
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              />
              <Chip
                label={`Total Value`}
                size="small"
                sx={{
                  bgcolor: "rgba(76, 175, 80, 0.9)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
          )}
        </DialogTitle>

        <AgentCatalog
          sessionRef={sessionRef}
          selectedPackages={selectedPackages}
          onPackageSelect={handlePackageSelect}
          clearSelectedPackages={clearSelectedPackages}
          sharedPackages={sharedPackages}
          isSharingPackages={isSharingPackages}
          sharingProgress={sharingProgress}
          sharingStatus={sharingStatus}
        />

        <DialogActions
          sx={{
            p: 3,
            bgcolor: "grey.50",
            position: "sticky",
            bottom: 0,
            borderTop: "1px solid",
            borderColor: "grey.300",
          }}
        >
          <Button
            onClick={() => {
              setPackagesDialogOpen(false);
              setSelectedPackages([]);
            }}
            color="secondary"
          >
            Cancel
          </Button>

          <Button
            onClick={shareSelectedPackages}
            variant="contained"
            color="primary"
            disabled={selectedPackages.length === 0 || isSharingPackages}
            sx={{
              minWidth: 200,
              py: 1.5,
              px: 3,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow:
                selectedPackages.length > 0 && !isSharingPackages
                  ? "0 4px 12px rgba(25, 118, 210, 0.3)"
                  : "none",
              background:
                selectedPackages.length > 0 && !isSharingPackages
                  ? "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)"
                  : undefined,
              "&:hover": {
                background:
                  selectedPackages.length > 0 && !isSharingPackages
                    ? "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)"
                    : undefined,
                boxShadow: !isSharingPackages ? "0 6px 16px rgba(25, 118, 210, 0.4)" : "none",
                transform: !isSharingPackages ? "translateY(-2px)" : "none",
              },
              "&:disabled": {
                background: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.26)",
              },
              transition: "all 0.3s ease",
            }}
            startIcon={isSharingPackages ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSharingPackages
              ? `${sharingProgress.toFixed(0)}% - ${sharingStatus}`
              : selectedPackages.length === 0
              ? "Select Packages to Share"
              : `Share ${selectedPackages.length} Package${selectedPackages.length > 1 ? "s" : ""}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tour Comparison Modal - Rendered outside dialog to appear on top */}
      <TourComparisonModal
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={removeFromCompare}
        onClearComparison={clearComparison}
        getBestValue={getBestValue}
        userType="agent"
      />

      {/* Shared Packages Comparison Modal */}
      <Dialog
        open={sharedComparisonOpen}
        onClose={() => setSharedComparisonOpen(false)}
        maxWidth="xl"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "90vh",
            maxHeight: "95vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <CompareIcon />
          Shared Packages Comparison ({sharedPackages.length} packages)
        </DialogTitle>

        <DialogContent sx={{ p: 0, height: '80vh' }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {sharedPackages.map((pkg) => (
                <Grid sx={{ width: "250px" }} item xs={3} md={3} lg={3} key={pkg.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={pkg.image}
                      alt={pkg.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {pkg.name}
                      </Typography>
                      <Chip
                        label={pkg.type}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {pkg.description}
                      </Typography>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${pkg.price.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "grey.50" }}>
          <Button
            onClick={() => setSharedComparisonOpen(false)}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MeetingPage;
