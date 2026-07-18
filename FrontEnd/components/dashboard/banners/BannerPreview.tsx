"use client";

interface Props {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    buttonText: string;
    position: string;
}

export default function BannerPreview({
    title,
    subtitle,
    description,
    image,
    buttonText,
    position,
}: Props) {
    const defaultImg = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600";
    return (
        <div className="bg-[#145A3B] rounded-3xl text-white overflow-hidden p-8 flex flex-col md:flex-row items-center gap-6 shadow-md border relative">
            <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                {position || "Preview"}
            </span>

            <div className="flex-1 space-y-4 pt-4">
                <span className="text-[10px] bg-green-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    ReUse Banner Preview
                </span>
                <h1 className="text-2xl font-bold leading-snug">
                    {title || "Summer Sale"}
                </h1>
                <p className="text-sm text-green-100 font-medium">
                    {subtitle || "Diskon sampai 50%"}
                </p>
                {description && (
                    <p className="text-xs text-green-200/80 leading-relaxed truncate max-w-[280px]">
                        {description}
                    </p>
                )}
                <div>
                    <button type="button" className="bg-white text-[#145A3B] font-bold text-xs px-5 py-3 rounded-xl hover:bg-green-50 transition shadow-sm">
                        {buttonText || "Belanja Sekarang"}
                    </button>
                </div>
            </div>

            <div className="w-28 h-28 relative rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <img
                    src={image || defaultImg}
                    alt="Realtime Banner Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultImg;
                    }}
                />
            </div>
        </div>
    );
}
