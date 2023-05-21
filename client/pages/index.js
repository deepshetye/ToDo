import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import CardItem from '../components/CardItem';
import { createGuidId } from '../utils';
import { getTodos } from '../utils/axios';
import AddTaskButton from '../components/ui/AddTaskButton';

const BoardData = [
  {
    name: 'Backlog',
    items: [
      {
        id: 1,
        priority: 0,
        title: 'Company website redesign.',
        chat: 1,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 2,
        priority: 2,
        title: 'Mobile app login process prototype.',
        chat: 10,
        attachment: 4,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'In Progress',
    items: [
      {
        id: 3,
        priority: 1,
        title: 'Research and strategy for upcoming project.',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'In Review',
    items: [
      {
        id: 4,
        priority: 2,
        title: 'Dashboard layout redesign.',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 5,
        priority: 0,
        title: 'Social media posts',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Completed',
    items: [
      {
        id: 6,
        priority: 0,
        title: 'Review client spec document and give feedback.',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 7,
        priority: 1,
        title: 'Navigation designs',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
      {
        id: 8,
        priority: 2,
        title: 'Create style guide based on previous feedback',
        chat: 5,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/64.jpg',
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        // const data = getTodos();
        // setBoardData([...data]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Check to make sure browser is loaded to render board
  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  };

  return (
    <div className="p-8 h-screen">
      <Head>
        <title>ToDo</title>
        <meta name="description" content="ToDo App created for DoctusTech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-5 my-2">
            {boardData.map((board, bIndex) => {
              return (
                <div key={board.name}>
                  <Droppable droppableId={bIndex.toString()}>
                    {(provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div
                          className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && 'bg-green-100'}`}
                        >
                          <span
                            className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                          ></span>
                          <h4 className="p-3 flex justify-between items-center">
                            <span className="text-base font-medium text-gray-600">
                              {board.name}
                            </span>
                          </h4>

                          <div
                            className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{ maxHeight: 'calc(100vh - 200px)' }}
                          >
                            {board.items.length > 0 &&
                              board.items.map((item, iIndex) => {
                                return (
                                  <CardItem
                                    key={item.id}
                                    data={item}
                                    index={iIndex}
                                    className="m-3"
                                  />
                                );
                              })}
                            {provided.placeholder}
                          </div>

                          {showForm && selectedBoard === bIndex ? (
                            <div className="p-3">
                              <textarea
                                className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                rows={3}
                                placeholder="Task info"
                                data-id={bIndex}
                                onKeyDown={(e) => onTextAreaKeyPress(e)}
                              />
                            </div>
                          ) : (
                            <AddTaskButton
                              setSelectedBoard={setSelectedBoard}
                              setShowForm={setShowForm}
                              bIndex={bIndex}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
