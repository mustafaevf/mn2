import React from 'react';
import { Board } from '../../../types/Board';
import PlayerCircle from './PlayerCircle';
import { userEvent } from '../../../pages/GameBoardPage/GameBoardPage';
import Button from '../../ui/Button';

type Field = {
    pos: number;
    title: string;
    action: string;
    price?: number;
    upgrade?: number;
    pawn?: number;
    buyback?: number;
    tax?: number;
    level?: object;
    group?: number;
};

interface GameBoardProps {
    board: Board;
    fields: Field[];
    userEvent: userEvent | null;
    // chats?: string[];
}

const GameBoard = ({ fields, board, userEvent }: GameBoardProps) => {
    if (!fields || fields.length === 0) return <div>Нет данных</div>;
    const cellWidthTopBottom = 71;
    const cellHeightTopBottom = 144;
    const cellWidthSides = 144;
    const cellHeightSides = 71;
    const cornerSize = 144;

    const getFieldOwner = (fieldPos: number) => {
        for (const user of board.players) {
            for (const pr of user.properties) {
                if (pr.pos === fieldPos) {
                    if (pr.status == 0) {
                        return [user.color + '-opacity isPawned', user.id, pr.status, pr.tax];
                    }
                    return [user.color, user.id, pr.status, pr.tax];
                }
            }
        }
        return [null, null, null, null];
    };

    console.log(fields[1].group);
    return (
        <div className="relative w-[927px] h-[927px]">
            {board.players &&
                board.players.map((player) => (
                    <PlayerCircle
                        key={player.socketId}
                        color={player.color}
                        pos={player.position}
                        players={board.players}
                    />
                ))}
            <div className="absolute top-2 left-2 text-lg font-semibold">Старт</div>
            {userEvent && (
                <div className="absolute left-[190px] top-[190px] right-[190px]">
                    <div className="bg-[#101010] w-full rounded  flex flex-col">
                        <div className="text-xl font-bold bg-radial rounded-tl rounded-tr p-4">
                            {userEvent.description}
                        </div>
                        <div className="flex items-center justify-center gap-1 p-4">
                            {userEvent.actions.map((action) => (
                                <Button label={action.name} onClick={action.func} variant="monopoly" />
                                // <button onClick={action.func}>{action.name}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                ⏳ 11:42
            </div> */}
            <div
                className="absolute top-0 left-0 w-[144px] h-[144px] bg-[#DBDBDB] flex items-center justify-center"
                style={{ borderTopLeftRadius: '13px' }}
            >
                <span>Старт</span>
            </div>
            <div className="h-line absolute top-[144px] left-[71px] w-[784px]"></div>
            <div className="h-line absolute bottom-[144px] left-[0px] w-[784px]"></div>
            <div className="v-line absolute top-[144px] right-[144px] h-[639px]"></div>
            <div className="v-line absolute top-[144px] left-[144px] h-[639px]"></div>
            <div
                className="absolute top-0 right-0 w-[144px] h-[144px] bg-[#DBDBDB] flex items-center justify-center"
                style={{ borderTopRightRadius: '13px' }}
            >
                <div className="icon w-[57px] h-[57px] bg-[#000]" style={{ maskImage: 'url("/jail.svg")' }}></div>
                <div className="absolute top-0">
                    <div className="text-black">Тюрьма</div>
                    {/* <span></span> */}
                </div>
                <div className="absolute rotate-90 right-[-20px]">
                    <span>тюрьма</span>
                </div>
                <div className="absolute bottom-0">
                    <span>отдых</span>
                </div>
                <div className="absolute left-[-15px] rotate-[-90deg]">
                    <span>Отдых</span>
                </div>
            </div>
            {/* <div className="h-line absolute top-[144px] left-[71px] w-[784px]"></div> */}
            <div
                className="absolute bottom-0 left-0 w-[144px] h-[144px] bg-[#DBDBDB] flex items-center justify-center"
                style={{ borderBottomLeftRadius: '13px' }}
            >
                <span>Угол</span>
            </div>
            <div
                className="absolute bottom-0 right-0 w-[144px] h-[144px] bg-[#DBDBDB] flex items-center justify-center"
                style={{ borderBottomRightRadius: '13px' }}
            >
                <span>Тюрьма</span>
            </div>

            {[...Array(9)].map((_, index) => (
                <div className="relative">
                    <div
                        key={index}
                        className={`absolute top-0 bg-white flex items-center justify-center bg-monopoly-group-${fields[index + 1]?.group ?? 99}`}
                        style={{
                            width: `${cellWidthTopBottom}px`,
                            height: `${cellHeightTopBottom}px`,
                            left: `${cornerSize + index * cellWidthTopBottom}px`,
                        }}
                    >
                        {getFieldOwner(index + 1)[0] && (
                            <div
                                className={`absolute bottom-[-10px] ${index == 0 ? `left-[3px] w-[67px]` : ` w-full`} h-[7px] bg-player-${getFieldOwner(index + 1)[0]}`}
                            ></div>
                        )}

                        {fields[index + 1].group ? (
                            <div
                                className={`absolute bottom-0 w-full flex items-center justify-center h-[30px] bg-monopoly-group-${fields[index + 1]?.group ?? 99}-opacity`}
                            >
                                {fields[index + 1].price}
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="absolute right-0">
                            {fields[index + 1].group == fields[index + 2].group ? <div className="line"></div> : ''}
                        </div>
                        {fields[index + 1].action == 'special' ? (
                            // <img src="{" alt="" />
                            <div
                                className="icon w-[30px] rotate-[270deg] h-[57px] bg-[#000] flex"
                                style={{ maskImage: 'url("/que.svg")' }}
                            ></div>
                        ) : (
                            <span>{fields[index + 1].title}</span>
                        )}
                    </div>
                </div>
            ))}

            {[...Array(9)].map((_, index) => (
                <div className="relative">
                    <div
                        key={index}
                        className={`absolute right-0 bg-white flex items-center justify-center bg-monopoly-group-${fields[index + 11]?.group ?? 99}`}
                        style={{
                            width: `${cellWidthSides}px`,
                            height: `${cellHeightSides}px`,
                            top: `${cornerSize + index * cellHeightSides}px`,
                        }}
                    >
                        {getFieldOwner(index + 11)[0] && (
                            <div
                                className={`absolute left-[-10px] h-full w-[7px] bg-player-${getFieldOwner(index + 11)[0]}`}
                            ></div>
                        )}

                        {fields[index + 11].group ? (
                            <div
                                className={`absolute left-0 h-full flex items-center justify-center w-[30px] bg-monopoly-group-${fields[index + 11]?.group ?? 99}-opacity`}
                            >
                                <div className="font-secondary rotate-90">{fields[index + 11].price}</div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="absolute bottom-0">
                            {fields[index + 11].group == fields[index + 12].group ? (
                                <div className="line-right"></div>
                            ) : (
                                ''
                            )}
                        </div>
                        {fields[index + 11].action == 'special' ? (
                            // <img src="{" alt="" />
                            <div
                                className="icon w-[30px]  h-[57px] bg-[#000] flex"
                                style={{ maskImage: 'url("/que.svg")' }}
                            ></div>
                        ) : (
                            <span>{fields[index + 11].title}</span>
                        )}
                    </div>
                </div>
            ))}

            {[...Array(9)].map((_, index) => (
                // <div className="relative">

                <div
                    key={index}
                    className={`absolute bottom-0 bg-white flex items-center justify-center bg-monopoly-group-${fields[29 - index]?.group ?? 99}`}
                    style={{
                        width: `${cellWidthTopBottom}px`,
                        height: `${cellHeightTopBottom}px`,
                        left: `${cornerSize + index * cellWidthTopBottom}px`,
                    }}
                >
                    {getFieldOwner(29 - index)[0] && (
                        <div
                            className={`absolute top-[-10px] w-full h-[7px] bg-player-${getFieldOwner(29 - index)[0]}`}
                        ></div>
                    )}

                    {fields[29 - index].group ? (
                        <div
                            className={`absolute bottom-0 w-full flex items-center justify-center h-[30px] bg-monopoly-group-${fields[29 - index]?.group ?? 99}-opacity`}
                        >
                            {fields[29 - index].price}
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="absolute left-0">
                        {fields[29 - index].group == fields[30 - index].group ? <div className="line"></div> : ''}
                    </div>
                    {fields[29 - index].action == 'special' ? (
                        // <img src="{" alt="" />
                        <div
                            className="icon w-[30px] rotate-[270deg] h-[57px] bg-[#000] flex"
                            style={{ maskImage: 'url("/que.svg")' }}
                        ></div>
                    ) : (
                        <span>{fields[29 - index].title}</span>
                    )}
                </div>
                // </div>
            ))}

            {[...Array(9)].map((_, index) => (
                <div
                    key={index}
                    className={`absolute left-0 bg-white flex items-center justify-center  bg-monopoly-group-${fields[39 - index]?.group ?? 99}`}
                    style={{
                        width: `${cellWidthSides}px`,
                        height: `${cellHeightSides}px`,
                        top: `${cornerSize + index * cellHeightSides}px`,
                    }}
                >
                    {getFieldOwner(39 - index)[0] && (
                        <div
                            className={`absolute right-[-10px] h-full w-[7px] bg-player-${getFieldOwner(39 - index)[0]}`}
                        ></div>
                    )}
                    {fields[39 - index].group ? (
                        <div
                            className={`absolute right-0 h-full flex items-center justify-center w-[30px] bg-monopoly-group-${fields[39 - index]?.group ?? 99}-opacity`}
                        >
                            <div className="font-secondary rotate-[-90deg]">{fields[39 - index].price}</div>
                        </div>
                    ) : (
                        ''
                    )}
                    {fields[39 - index].action == 'special' ? (
                        // <img src="{" alt="" />
                        <div
                            className="icon w-[30px] rotate-[180deg] h-[57px] bg-[#000] flex"
                            style={{ maskImage: 'url("/que.svg")' }}
                        ></div>
                    ) : (
                        <span>{fields[39 - index].title}</span>
                    )}
                </div>
            ))}
        </div>
        // <div className="absolute flex flex-col">
        //     {chats && chats.map((chat) => <div className="text-primary">{chat}</div>)}
        // </div>
    );
};

export default GameBoard;
