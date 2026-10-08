
const Footer = () => { //border-t border-gray-300
    return (
        <footer className="bg-white shadow-sm py-6 mt-12">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

                <div className="flex items-center">
                    <p className="font-normal text-[14px] text-[#1D271F]">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                <p className="text-[#1D271F] text-[14px] font-normal text-center md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>

        </footer>
    );
};

export default Footer;