import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <>
      <main className="pt-[100px] px-1 md:px-[100px]">
        <div className="w-full md:w-8/12">
          <div className="grid md:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
              async (_value: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="border border-gray-300 dark:border-gray-600 rounded-md mb-4 animate-pulse"
                  >
                    <div className="p-4">
                      <div className="flex flex-col mb-3">
                        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="flex gap-2 items-center text-xs text-gray-500 font-extralight">
                          <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faClock} />
                            <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          </div>
                          <div className="flex gap-1 items-center">
                            <FontAwesomeIcon icon={faUser} />
                            <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-full h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-full h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-full h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="w-[70%] h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* TODO:  */}
      </main>
    </>
  );
}
