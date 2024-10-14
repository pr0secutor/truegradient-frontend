import React from "react";
import { useSelector } from "react-redux";

const AdminDash = () => {
  const responses = useSelector((state) => state.app.responses);

  //   console.log(responses.data);

  let groupedData;

  if (responses.data !== undefined) {
    const data = Object.values(responses?.data); // Convert the object to an array

    // Group data by 'created_by' field
    groupedData = data.reduce((acc, item) => {
      const key = item.created_by; // Assumes each item has a 'created_by' field
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    console.log(groupedData);
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-medium">All saved User Respones</h3>
      <div className="space-y-4">
        {groupedData &&
          Object.entries(groupedData).map(([email, responses]) => {
            return (
              <>
                <h4 className="text-2xl">{email}</h4>
                {responses.map((response) => {
                  return (
                    <div className="flex flex-col p-4 rounded-xl bg-gray-100">
                      <div className="flex flex-row px-2 py-4 sm:px-4">
                        <img
                          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                          src="https://dummyimage.com/256x256/363536/ffffff&text=U"
                          alt="profile-pic"
                        />

                        <div className="flex max-w-3xl items-center">
                          <p>{response.question}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 shadow-sm sm:px-4">
                        <img
                          className="mr-2 flex h-8 w-8 rounded-full sm:mr-4"
                          src="https://dummyimage.com/256x256/354ea1/ffffff&text=G"
                          alt="profile-pic"
                        />

                        <div className="flex max-w-3xl items-center rounded-xl">
                          <p>{response.result_text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AdminDash;
