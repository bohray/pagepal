import React, { useEffect, useState } from "react";
import { usersAPI } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      if (!user.id) {
        toast.error("Missing Data!!");
      }
      try {
        const response = await usersAPI.getProfile(user.id);
        console.log(response);
        setData(response.data);
      } catch (err) {
        console.log(err);
        toast.error(err?.message || "Failed to fetch profile data");
      }
    };
    getData();
  }, []);
  return (
    // <div>Working</div>
    <div className="max-w-2xl mx-auto">
      {/* User Header */}
      <div className="mb-8 p-6 bg-linear-to-r from-primary/10 to-primary/5 rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold  mb-2">{data.user?.username}</h2>
        <p className="mb-4">{data.user?.email}</p>
        <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
          Active Reader
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-card p-6 rounded-lg border border-gray-300 shadow-sm">
          <div className="text-sm mb-2 font-medium">Total Books</div>
          <div className="text-3xl font-bold text-primary">
            {data.recommendations?.length}
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-gray-300 shadow-sm">
          <div className=" text-sm mb-2">Total Votes</div>
          <div className="text-3xl font-bold text-primary">
            {data?.total_votes_received}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <h3 className="text-2xlfont-bold mb-6">My Recommendations</h3>
      <div className="space-y-4">
        {data.recommendations?.length > 0 ? (
          data.recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-card p-6 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold ">{rec.book?.title}</h4>
                  <p className="">{rec.book?.author}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm ">Votes</div>
                  <div className="text-2xl font-bold text-primary">
                    {rec.vote_count}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className=" text-center">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
