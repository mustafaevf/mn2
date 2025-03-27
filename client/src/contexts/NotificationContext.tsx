// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { motion } from 'framer-motion';

// interface Notification {
//     message: string;
//     type: 'success' | 'error' | 'info';
// }

// interface NotificationContextType {
//     notification: Notification | null;
//     addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
//     removeNotification: () => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider = ({ children }: { children: ReactNode }) => {
//     const [notification, setNotification] = useState<Notification | null>(null);

//     const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
//         setNotification({ message, type });

//         setTimeout(() => {
//             setNotification(null);
//         }, 3000);
//     };

//     const removeNotification = () => setNotification(null);

//     return (
//         <NotificationContext.Provider value={{ notification, addNotification, removeNotification }}>
//             {children}
//             <div className="fixed top-[100px] right-5 w-[300px] z-50 flex flex-col gap-2">
//                 {notification && (
//                     <motion.div
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 50 }}
//                         transition={{ duration: 0.3, ease: 'easeInOut' }}
//                         className={`p-4 rounded-lg shadow-lg text-white font-semibold flex items-center ${
//                             notification.type === 'error'
//                                 ? 'bg-error'
//                                 : notification.type === 'success'
//                                   ? 'bg-success'
//                                   : 'bg-blue-500'
//                         }`}
//                     >
//                         {notification.type === 'error' ? (
//                             <div
//                                 className="w-5 h-5 bg-red-500 mr-4"
//                                 style={{
//                                     WebkitMaskImage: 'url(/forbitten.svg)',
//                                     maskImage: 'url(/forbitten.svg)',
//                                     maskSize: 'cover',
//                                     maskRepeat: 'no-repeat',
//                                 }}
//                             />
//                         ) : null}
//                         <div className="text-primary text-white font-medium">
//                             {notification.message}

//                         </div>
//                     </motion.div>
//                 )}
//             </div>
//         </NotificationContext.Provider>
//     );
// };

// export const useNotification = () => {
//     const context = useContext(NotificationContext);
//     if (!context) {
//         throw new Error('useNotification must be used within a NotificationProvider');
//     }
//     return context;
// };


import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

interface NotificationContextType {
    addNotification: (message: string, type: "success" | "error" | "info") => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: "success" | "error" | "info") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 1500);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}

            <div className="fixed top-[100px] right-5 w-[300px] z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {notifications.map(({ id, message, type }) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`p-4 rounded-lg shadow-lg text-white font-semibold flex items-center ${
                                type === 'error'
                                    ? 'bg-error'
                                    : type === 'success'
                                      ? 'bg-success'
                                      : 'bg-blue-500'
                            }`}
                        >
                            {type === "error" && (
                                <div
                                    className="w-5 h-5 bg-red-500 mr-4"
                                    style={{
                                        WebkitMaskImage: "url(/forbitten.svg)",
                                        maskImage: "url(/forbitten.svg)",
                                        maskSize: "cover",
                                        maskRepeat: "no-repeat",
                                    }}
                                />
                            )}
                            <div className="text-white font-medium">{message}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
