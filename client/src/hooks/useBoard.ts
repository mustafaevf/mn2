import {useState, useEffect} from "react";
import { Player } from "../types/Player";
import { Board } from "../types/Board";
import client from "../services/client";

const useBoard = (uuid: string) => {
    const [board, setBoard] = useState<Board>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await client.get<Board>(`http://localhost:8080/api/boards/${uuid}/info/status`);
                setBoard(response.data);
                setIsLoading(true);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };
        
        fetchBoard();
        console.log(board);
    }, [uuid]);

    return {board, isLoading};
}

export default useBoard;