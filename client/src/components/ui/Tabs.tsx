import { useState } from "react";
import { motion } from "framer-motion";

type TabsProps = {
  activeTab: String, 
  setActiveTab: (value: string) => void;
  tabs?: string[];
};

const Tabs = ({activeTab, setActiveTab, tabs=["Ставки", "Мои ставки"]}: TabsProps) => {
  // const [activeTab, setActiveTab] = useState("Ставки");

  return (
    <div className="flex flex-col mt-4">
      <div className="group flex w-fit bg-secondary rounded-lg relative p-1">
        {tabs.map((tab) => (
          <div
            key={tab}
            className="relative px-4 py-2 font-medium cursor-pointer transition-colors text-gray-400 z-0"
            onClick={() => setActiveTab(tab)}
          >
            <span className={activeTab === tab ? "text-white" : "text-gray-400"}>
              {tab}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute inset-0 bg-blue-500 rounded-lg z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
