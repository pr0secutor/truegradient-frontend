import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../appSlice";

const SavedResponses = () => {
  const responses = useSelector((state) => state.app.responses);
  const dispatch = useDispatch();

  console.log(responses);

  useEffect(() => {
    dispatch(setCurrentPage("SavedResponses"));
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-3xl font-medium">Saved Responses</h3>
      {responses.data &&
        Object.keys(responses.data).map((item, i) => {
          return (
            <div className="flex flex-col p-4 rounded-xl bg-gray-100">
              <div className="flex flex-row px-2 py-4 sm:px-4">
                <img
                  className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                  src="https://dummyimage.com/256x256/363536/ffffff&text=U"
                  alt="profile-pic"
                />

                <div className="flex max-w-3xl items-center">
                  <p>{responses.data[item].question}</p>
                </div>
              </div>

              <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 shadow-sm sm:px-4">
                <img
                  className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                  src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
                  alt="profile-pic"
                />

                <div className="flex max-w-3xl items-center rounded-xl">
                  <p>{responses.data[item].result_text}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SavedResponses;
