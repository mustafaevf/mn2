import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="w-69 min-w-64 h-screen bg-secondary border-r border-border p-2 flex flex-col space-y-4 text-white">
            <Link to="/games/monopoly" className="text-base hover:bg-hover rounded px-4 py-4 transition-colors duration-300">
                Monopoly
            </Link>
            <Link to="/games/double" className="text-base hover:bg-hover rounded px-4 py-4 transition-colors duration-300">
                Double
            </Link>
            <Link to="/games/crash" className="text-base hover:bg-hover rounded px-4 py-4 transition-colors duration-300">
                Crash
            </Link>
            <Link to="/games/miner" className="text-base hover:bg-hover rounded px-4 py-4 transition-colors duration-300">
                Miner
            </Link>
        </nav>
    );
};

export default Sidebar;
