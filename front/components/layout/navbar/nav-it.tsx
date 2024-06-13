export const NavIt = ({ text, link }: { text: string, link: string }) => {
    return (
        <div className="mr-4 text-xl cursor-pointer transition-all duration-200 hover:text-turquoise-50 max-sm:mr-2 max-sm:text-lg">
            <a href={link}>{text}</a>
        </div>
    )
}
