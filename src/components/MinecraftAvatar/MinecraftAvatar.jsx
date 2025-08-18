import { useEffect, useRef, useState } from "react";

export default function MinecraftAvatar({ showNameOnHover = true }) {
    const canvasRef = useRef(null);
    const viewerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);

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
                const skinview3d = await import("skinview3d");
                const { SkinViewer, WalkingAnimation } = skinview3d;

                // Avatar size (scaled up ~120%)
                viewer = new SkinViewer({
                    canvas: canvasRef.current,
                    width: 720,   // was 600
                    height: 900,  // was 750
                });
                viewerRef.current = viewer;

                await viewer.loadSkin("https://crafatar.com/skins/aaf71728-7390-4175-bd18-9c36cd4697fc");

                try {
                    await viewer.loadCape("https://crafatar.com/capes/b876ec32-e396-476b-a115-8438d83c67d4");
                } catch {
                    console.log("No cape found");
                }

                viewer.controls.enableRotate = true;
                viewer.controls.enableZoom = false;

                const walkingAnimation = new WalkingAnimation();
                walkingAnimation.speed = 0.6;
                viewer.animation = walkingAnimation;

                viewer.playerObject.rotation.y = -0.5;
                viewer.playerObject.rotation.x = 0.2;

                viewer.camera.position.z = 80;
                viewer.nameTag = "";

                setIsReady(true);
            } catch (err) {
                console.error("Failed to initialize:", err);
                setError(err.message);
                setIsReady(false);
            }
        };

        initViewer();

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
    }, []);

    return (
        <div
            className="flex justify-center items-center minecraft-avatar-container"
            style={{
                width: 300,   // reduced from 400 → makes hero text breathe
                height: 800,
                position: "relative",
                overflow: "visible", // let avatar stick out beyond container
            }}
        >
            <canvas
                ref={canvasRef}
                className={
                    isReady
                        ? "opacity-100 transition-opacity duration-300"
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
            />

            {/* Invisible hover zone (narrower, only around body) */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 200,   // slim width so hover doesn’t trigger too far away
                    height: 700,
                    zIndex: 18,
                }}
                onMouseEnter={() => {
                    if (showNameOnHover) setNameTag("Co_Prime");
                }}
                onMouseLeave={() => {
                    if (showNameOnHover) setNameTag("");
                }}
            />

            {error && (
                <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    Offline Mode
                </div>
            )}
        </div>
    );
}
