import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="max-w flex flex-col text-white gap-4">
            <div className="flex flex-col bg-secondary rounded px-2 py-2">
                <div className="bg-box rounded px-4 py-3 font-bold text-base flex justify-between items-center">
                    Игры
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 shrink-0 text-primary transition-transform duration-300 group-data-[state=open]/collapsible-menu-button:-rotate-180"><path fill="currentColor" fill-rule="evenodd" d="M4.003 8.579c0 .29.11.59.33.81l6.86 6.85c.45.45 1.17.45 1.62 0l6.85-6.85c.45-.45.45-1.17 0-1.62a1.14 1.14 0 0 0-1.62 0l-6.05 6.05-6.05-6.05a1.14 1.14 0 0 0-1.95.81z" clip-rule="evenodd"></path></svg>
                </div>
                <div className="ml-2 mt-2 text-sm flex flex-col">
                <Link to="/games/monopoly" className="hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Monopoly
                </Link>
                <Link to="/games/double" className="hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Double
                </Link>
                <Link to="/games/crash" className=" hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Crash
                </Link>
                <Link to="/games/miner" className=" hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Miner
                </Link>
                </div>
            </div>
            <div className="flex flex-col bg-secondary rounded px-2 py-2">
                <Link to="/games/monopoly" className="hover:bg-hover text-sm rounded px-4 py-3 transition-colors duration-300">
                    Monopoly
                </Link>
            </div>
            <div className="flex flex-col text-sm bg-secondary rounded px-2 py-2">
                <Link to="/games/monopoly" className="hover:bg-hover rounded px-4 py-3 transition-colors duration-300 flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-5 shrink-0 text-secondary"><path fill="currentColor" fill-rule="evenodd" d="M11.272 6.5c-.407-1.151-1.327-3-3.053-3-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5zM17.82 5c0-.827-.673-1.5-1.501-1.5-1.725 0-2.646 1.849-3.052 3h3.052c.828 0 1.501-.673 1.501-1.5m.9 1.78h.436a2.38 2.38 0 0 1 2.377 2.38v.81a2.27 2.27 0 0 1-2.27 2.27H5.378A2.377 2.377 0 0 1 3 9.87v-.82a2.273 2.273 0 0 1 2.272-2.27h.546A2.97 2.97 0 0 1 5.219 5c0-1.654 1.346-3 3-3 2.123 0 3.365 1.592 4.05 2.999C12.954 3.592 14.196 2 16.319 2a3.005 3.005 0 0 1 3.001 3c0 .669-.228 1.281-.6 1.78M4.845 13.538a.3.3 0 0 0-.3.3v4.442a2.974 2.974 0 0 0 2.97 2.97h3.703a.3.3 0 0 0 .3-.3v-7.112a.3.3 0 0 0-.3-.3zm8.473 0a.3.3 0 0 0-.3.3v7.112a.3.3 0 0 0 .3.3h3.704a2.973 2.973 0 0 0 2.969-2.97v-4.442a.3.3 0 0 0-.3-.3z" clip-rule="evenodd"></path></svg>
                    Бонусы
                </Link>
                <Link to="/games/double" className="hover:bg-hover rounded px-4 py-3 transition-colors duration-300 flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 shrink-0 text-secondary"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.919 10.923a.75.75 0 0 1-1.029-.257c-.486-.811-.867-1.834-1.133-3.042a.749.749 0 1 1 1.465-.322c.23 1.049.55 1.921.954 2.592a.75.75 0 0 1-.257 1.029Zm11.303-5.747a.75.75 0 0 0-.745-.666h-2.463c.034-.56.037-.933.037-1.01a.5.5 0 0 0-.5-.5H6.45a.5.5 0 0 0-.5.501c0 .077.003.45.037 1.009H3.524a.75.75 0 0 0-.745.666c-.02.174-.441 4.281 2.712 6.356a.75.75 0 1 0 .825-1.253C4.59 9.144 4.29 7.073 4.256 6.01h1.873c.389 3.129 1.636 8.118 5.62 8.68v1.753H9.405a.5.5 0 0 0-.476.348l-.697 2.175H6.9a.75.75 0 0 0 0 1.5h11.345a.75.75 0 0 0 0-1.5h-1.332l-.696-2.175a.501.501 0 0 0-.476-.348h-2.492v-1.752c3.992-.556 5.238-5.549 5.626-8.681h1.87c-.034 1.063-.334 3.134-2.06 4.269a.751.751 0 0 0 .826 1.253c3.153-2.075 2.73-6.182 2.71-6.356Z" fill="currentColor"></path></svg>
                    Турниры
                </Link>
                <Link to="/games/crash" className=" hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Партнерам
                </Link>
                <Link to="/games/miner" className=" hover:bg-hover rounded px-4 py-3 transition-colors duration-300">
                    Поддержка
                </Link>
            </div>
        </div>
    );
};  

export default Sidebar;
