import { useEffect, useRef, useState } from "react";

export default function MinecraftAvatar({ showNameOnHover = true, preloaded = false }) {
    const canvasRef = useRef(null);
    const viewerRef = useRef(null);
    const containerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInHoverZone, setIsInHoverZone] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const setNameTag = (name) => {
        if (viewerRef.current) {
            viewerRef.current.nameTag = name;
        }
    };

    useEffect(() => {
        let viewer = null;

        const initViewer = async () => {
            if (!canvasRef.current) return;

            try {
                setIsLoading(true);

                const skinview3d = await import("skinview3d");
                const { SkinViewer, WalkingAnimation } = skinview3d;

                // Avatar size (scaled up ~120%)
                viewer = new SkinViewer({
                    canvas: canvasRef.current,
                    width: 720,   // was 600
                    height: 900,  // was 750
                });
                viewerRef.current = viewer;

                // Load skin with error handling
                try {
                    await viewer.loadSkin("https://crafatar.com/skins/aaf71728-7390-4175-bd18-9c36cd4697fc");
                } catch (skinError) {
                    console.warn("Failed to load skin:", skinError);
                    // Continue without skin
                }

                // Load cape with error handling
                try {
                    await viewer.loadCape("https://crafatar.com/capes/b876ec32-e396-476b-a115-8438d83c67d4");
                } catch (capeError) {
                    console.log("No cape found or failed to load cape");
                    // Continue without cape
                }

                // Start with rotation disabled
                viewer.controls.enableRotate = false;
                viewer.controls.enableZoom = false;

                const walkingAnimation = new WalkingAnimation();
                walkingAnimation.speed = 0.6;
                viewer.animation = walkingAnimation;

                viewer.playerObject.rotation.y = -0.5;
                viewer.playerObject.rotation.x = 0.2;

                viewer.camera.position.z = 80;
                viewer.nameTag = "";

                setIsLoading(false);
                setIsReady(true);
                setError(null);
            } catch (err) {
                console.error("Failed to initialize avatar:", err);
                setError(err.message);
                setIsReady(false);
                setIsLoading(false);
            }
        };

        // If preloaded, initialize immediately, otherwise add a small delay
        if (preloaded) {
            initViewer();
        } else {
            const timeout = setTimeout(() => {
                initViewer();
            }, 100);
            return () => clearTimeout(timeout);
        }

        return () => {
            if (viewerRef.current) {
                try {
                    viewerRef.current.dispose();
                } catch (err) {
                    console.warn("Error disposing viewer:", err);
                }
                viewerRef.current = null;
            }
        };
    }, [preloaded]);

    // Handle global mouse up to stop dragging
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                // Only disable rotation if we're not in the hover zone
                if (!isInHoverZone && viewerRef.current) {
                    viewerRef.current.controls.enableRotate = false;
                }
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, isInHoverZone]);

    const handleMouseMove = (e) => {
        if (!containerRef.current || !isReady) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Define the hover zone (narrow area around the body)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const zoneWidth = 200;
        const zoneHeight = 700;

        const inZone =
            x >= centerX - zoneWidth / 2 &&
            x <= centerX + zoneWidth / 2 &&
            y >= centerY - zoneHeight / 2 &&
            y <= centerY + zoneHeight / 2;

        if (inZone && !isInHoverZone) {
            setIsInHoverZone(true);
            if (showNameOnHover) setNameTag("Co_Prime");
            if (viewerRef.current) {
                viewerRef.current.controls.enableRotate = true;
            }
        } else if (!inZone && isInHoverZone && !isDragging) {
            // Only remove hover state if not currently dragging
            setIsInHoverZone(false);
            if (showNameOnHover) setNameTag("");
            if (viewerRef.current && !isDragging) {
                viewerRef.current.controls.enableRotate = false;
            }
        }
    };

    const handleMouseLeave = () => {
        // Don't disable rotation if currently dragging
        if (!isDragging) {
            setIsInHoverZone(false);
            if (showNameOnHover) setNameTag("");
            if (viewerRef.current) {
                viewerRef.current.controls.enableRotate = false;
            }
        }
    };

    const handleMouseDown = () => {
        // Start dragging if rotation is enabled
        if (viewerRef.current && viewerRef.current.controls.enableRotate) {
            setIsDragging(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex justify-center items-center minecraft-avatar-container"
            style={{
                width: 300,   // reduced from 400 → makes hero text breathe
                height: 800,
                position: "relative",
                overflow: "visible", // let avatar stick out beyond container
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Loading indicator */}
            {/* {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )} */}

            <canvas
                ref={canvasRef}
                className={
                    isReady
                        ? "opacity-100 transition-opacity duration-500"
                        : "opacity-0"
                }
                style={{
                    width: 660,   // scaled 120% (was 550)
                    height: 840,  // scaled 120% (was 700)
                    zIndex: 10,
                    position: "relative",
                }}
                width={660}
                height={840}
                onMouseDown={handleMouseDown}
            />

            {/* Visual feedback for hover zone (optional - shows the active area) */}
            {isReady && (isInHoverZone || isDragging) && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 200,
                        height: 700,
                        // border: `2px dashed rgba(255, 255, 255, ${isDragging ? 0.2 : 0.1})`,
                        borderRadius: "8px",
                        pointerEvents: "none",
                        zIndex: 15,
                    }}
                />
            )}

            {error && (
                <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    Offline Mode
                </div>
            )}
        </div>
    );
}