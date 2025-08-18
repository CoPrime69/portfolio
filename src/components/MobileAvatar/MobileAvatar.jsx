import { motion } from "framer-motion";

const MobileAvatar = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00f5ff] shadow-lg shadow-[#00f5ff]/30"
        >
            <img
                src="https://crafatar.com/avatars/aaf71728-7390-4175-bd18-9c36cd4697fc?size=64"
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.src = "https://textures.minecraft.net/texture/31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb";
                }}
            />
        </motion.div>
    );
};

export default MobileAvatar;