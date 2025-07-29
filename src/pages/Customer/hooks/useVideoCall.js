import { useState, useRef, useEffect, useCallback } from "react";
import OT from "@opentok/client";
import axios from "axios";
import { openTokSessionSingleton } from "../../../services/OpenTokSessionManager";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const useVideoCall = ({ name, email, setUserId, setCallStarted, onEndCall, signalHandlers = {} }) => {
  // State
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [token, setToken] = useState(null);
  const [waitingForAgent, setWaitingForAgent] = useState(false);
  const [publisherHasVideo, setPublisherHasVideo] = useState(true);
  const [subscriberHasVideo, setSubscriberHasVideo] = useState(false);
  const [agentLeft, setAgentLeft] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Refs
  const sessionRef = useRef(null);
  const publisherRef = useRef(null);
  const subscriberRef = useRef(null);
  const publisher = useRef(null);
  const agentLeftTimeoutRef = useRef(null);
  const isPageVisibleRef = useRef(true);

  // Media permissions
  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Permissions granted");
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  };

  // Toggle controls
  const toggleVideo = useCallback(() => {
    if (publisher.current) {
      const newVideoState = !isVideoEnabled;
      publisher.current.publishVideo(newVideoState);
      setIsVideoEnabled(newVideoState);
      setPublisherHasVideo(newVideoState);
    }
  }, [isVideoEnabled]);

  const toggleAudio = useCallback(() => {
    if (publisher.current) {
      const newAudioState = !isAudioEnabled;
      publisher.current.publishAudio(newAudioState);
      setIsAudioEnabled(newAudioState);
    }
  }, [isAudioEnabled]);

  // Publisher initialization
  const initializePublisher = useCallback(() => {
    const session = sessionRef.current;
    if (!session || !publisherRef.current || publisher.current) {
      return;
    }

    publisher.current = OT.initPublisher(
      publisherRef.current,
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
        publishAudio: true,
        publishVideo: true,
        name: name,
        showControls: false,
        style: {
          buttonDisplayMode: 'off'
        }
      },
      (err) => {
        if (err) {
          console.error("❌ Publisher init error:", err);
          setError("Could not access camera/mic.");
          return;
        }
      }
    );

    // Publish to session
    session.publish(publisher.current, (err) => {
      if (err) {
        console.error("❌ Publishing failed:", err);
        setError("Publishing to session failed.");
      }
    });

    // Set up event listeners
    publisher.current.on("videoEnabled", () => {
      setPublisherHasVideo(true);
      setIsVideoEnabled(true);
    });
    
    publisher.current.on("videoDisabled", () => {
      setPublisherHasVideo(false);
      setIsVideoEnabled(false);
    });
    
    publisher.current.on("audioEnabled", () => {
      setIsAudioEnabled(true);
    });
    
    publisher.current.on("audioDisabled", () => {
      setIsAudioEnabled(false);
    });
  }, [name]);

  // Handle call acceptance
  const handleCallAccepted = useCallback(async () => {
    if (publisher.current) {
      console.warn("⚠️ Publisher already initialized. Skipping.");
      return;
    }

    setWaitingForAgent(false);
    setCallStarted(true);
    
    // Initialize publisher after a short delay to ensure refs are ready
    setTimeout(() => {
      if (publisherRef.current && !publisher.current) {
        initializePublisher();
      }
    }, 100);
  }, [setCallStarted, initializePublisher]);

  // Initialize session
  const initializeSession = useCallback(async () => {
    try {
      await requestMediaPermissions();
      
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      setError("");

      const res = await axios.post(`${backendUrl}/api/call-request`, {
        name,
        email,
      });

      const { id, apiKey, sessionId, token } = res.data;

      const session = OT.initSession(apiKey, sessionId);
      openTokSessionSingleton.initialize(session);
      sessionRef.current = session;
      setToken(token);
      setJoined(true);
      setWaitingForAgent(true);
      setUserId(id);

      session.connect(token, (err) => {
        if (err) {
          console.error("❌ Session connect error:", err);
          setError("Could not connect to session.");
          return;
        }
      });

    } catch (err) {
      console.error("❌ Session initialization error:", err);
      setError("Camera/Mic access denied or API error.");
    }
  }, [name, email, setUserId]);

  // Page visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
      console.log(`📱 Page visibility changed: ${isPageVisibleRef.current ? 'visible' : 'hidden'}`);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Session event handlers
  const setupSessionEventHandlers = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;

    const handleStreamCreated = (event) => {
      // Clear any pending agent left timeout when agent reconnects
      if (agentLeftTimeoutRef.current) {
        clearTimeout(agentLeftTimeoutRef.current);
        agentLeftTimeoutRef.current = null;
        setAgentLeft(false);
        console.log("🔄 Agent reconnected, cleared agent left timeout");
      }

      const subscriber = session.subscribe(
        event.stream,
        subscriberRef.current,
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
          showControls: false,
          style: {
            buttonDisplayMode: 'off'
          }
        },
        (err) => {
          if (err) console.error("❌ Subscribe error:", err);
        }
      );

      subscriber.on("videoEnabled", () => setSubscriberHasVideo(true));
      subscriber.on("videoDisabled", () => setSubscriberHasVideo(false));
      setSubscriberHasVideo(true);
    };

    const handleEndCall = () => {
      session.disconnect();
      onEndCall?.();
    };

    const handleAgentConnectionDestroyed = (event) => {
      const connection = event.connection;
      const reason = event.reason;
      
      console.log("🔌 Connection destroyed:", { 
        reason, 
        connectionId: connection?.connectionId,
        isPageVisible: isPageVisibleRef.current 
      });

      // If page is hidden (tab switched), don't immediately show agent left dialog
      if (!isPageVisibleRef.current) {
        console.log("📱 Page hidden during connection destroyed - likely tab switch, not showing agent left");
        return;
      }

      // If there's already a timeout pending, don't start another
      if (agentLeftTimeoutRef.current) {
        console.log("⏰ Agent left timeout already pending");
        return;
      }

      // Add a delay before showing "agent left" to handle temporary disconnections
      console.log("⏰ Starting agent left timeout (5 seconds)");
      agentLeftTimeoutRef.current = setTimeout(() => {
        console.log("⏰ Agent left timeout triggered - showing dialog");
        setAgentLeft(true);
        agentLeftTimeoutRef.current = null;
      }, 5000); // 5 second delay
    };

    // Core event listeners only
    session.on("signal:callAccepted", handleCallAccepted);
    session.on("streamCreated", handleStreamCreated);
    session.on("signal:endCall", handleEndCall);
    session.on("connectionDestroyed", handleAgentConnectionDestroyed);
    session.on("exception", (e) => console.error("⚠️ OpenTok exception:", e));

    // Register signal handlers with singleton
    if (Object.keys(signalHandlers).length > 0) {
      console.log('🔌 Registering signal handlers with singleton:', Object.keys(signalHandlers));
      openTokSessionSingleton.registerSignalHandlers(signalHandlers);
    }

    return () => {
      // Clear timeout on cleanup
      if (agentLeftTimeoutRef.current) {
        clearTimeout(agentLeftTimeoutRef.current);
        agentLeftTimeoutRef.current = null;
      }

      // Clean up core listeners only
      session.off("signal:callAccepted", handleCallAccepted);
      session.off("streamCreated", handleStreamCreated);
      session.off("signal:endCall", handleEndCall);
      session.off("connectionDestroyed", handleAgentConnectionDestroyed);
    };
  }, [handleCallAccepted, onEndCall, signalHandlers]);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Set up session event handlers
  useEffect(() => {
    if (sessionRef.current && token) {
      return setupSessionEventHandlers();
    }
  }, [token, setupSessionEventHandlers]);

  // Initialize publisher when ready
  useEffect(() => {
    if (joined && !waitingForAgent && publisherRef.current && !publisher.current) {
      console.log("🎥 Initializing publisher for customer");
      initializePublisher();
    }
  }, [joined, waitingForAgent, initializePublisher]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any pending timeouts
      if (agentLeftTimeoutRef.current) {
        clearTimeout(agentLeftTimeoutRef.current);
      }
      
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
      if (publisher.current) {
        publisher.current.destroy();
      }
    };
  }, []);

  return {
    // State
    error,
    setError,
    joined,
    waitingForAgent,
    publisherHasVideo,
    subscriberHasVideo,
    agentLeft,
    setAgentLeft,
    isVideoEnabled,
    isAudioEnabled,
    
    // Refs
    sessionRef,
    publisherRef,
    subscriberRef,
    publisher,
    
    // Methods
    toggleVideo,
    toggleAudio,
    initializeSession,
  };
}; 