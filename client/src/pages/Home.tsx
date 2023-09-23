import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Document, SharedDocument } from "../types/document";
import { format } from "date-fns"; // Import the format function from date-fns
import { FilePlus, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [sharedDocuments, setSharedDocuments] = useState<SharedDocument[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
  const handleDocumentClick = async (documentId: string) => {
    navigate("/document/" + documentId);
  };
  const handleCreateDocument = () => {
    navigate("/create");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchUserDocuments = async () => {
      const { data } = await axios.get("/document/");
      setDocuments(data);
    };
    fetchUserDocuments();
  }, []);
  useEffect(() => {
    const fetchSharedDocuments = async () => {
      const { data } = await axios.get("/document/shared/all");
      setSharedDocuments(data);
    };
    fetchSharedDocuments();
  }, []);
  const toggleButton = () => {
    setToggle(!toggle);
  };

  const handleDelete = (id: string) => {
    axios.delete(`/document/delete/${id}`);
    window.location.reload();
  }

  return (
    <div className="h-full w-full  mt-10">
      {toggle ? (
        <div className="mx-20">
          <h1 className="text-5xl text-white text-center mb-20 cursor-pointer underline underline-offset-4 font-bold ">
            DocWave ✨{" "}
          </h1>
          <div className="flex space-x-2 items-center">
            <p className="font-bold">Your Documents</p>
            <ToggleLeft
              color="white"
              size={49}
              onClick={toggleButton}
              className=""
            />
            <p className="font-bold">Shared</p>
          </div>
          <div className="text-white grid grid-cols-4 gap-5 grid-flow-row my-8">
            {documents.map((document) => (
              // <div
              //   className="bg-[#313338] flex flex-col shadow-md transform
              //                   transition duration-500 hover:scale-110 shadow-gray-700 hover:shadow-gray-500 hover:shadow-xl h-60 w-60 m-2 bg-gradient-to-r from-[#313338] to-gray-700 justify-between p-5"
              //   key={document.id}
              //   onClick={() => handleDocumentClick(document.id)}
              // >
              //   <div className="flex justify-between">
              //     <div>{document.title}</div>
              //     <Grip className="cursor-pointer" />
              //   </div>
              //   <p className="text-gray-400 mt-2">
              //     Last Opened:{" "}
              //     {format(new Date(document.updatedAt), "MMM dd HH:mm")}
              //   </p>
              // </div>
              <Card key={document.id} className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{document.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 mt-2">
                    Last Opened:{" "}
                    {format(new Date(document.updatedAt), "MMM dd HH:mm")}
                  </p>
                  {/* <p>{document.permissions}</p> */}
                  <Button onClick={() => handleDocumentClick(document.id)} className="mr-2">
                    Open
                  </Button>
                  <Button onClick={() => handleDelete(document.id)} variant={"destructive"}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
            <FilePlus
              size={40}
              className="fixed p-5 right-4 bottom-4 rounded-full bg-green-600 h-20 w-20 text-white cursor-pointer"
              onClick={handleCreateDocument}
            />
          </div>
        </div>
      ) : (
        // <div>
        //   <ToggleLeft color="white" size={49} onClick={toggleButton} />
        //   <h1 className="text-5xl text-white text-center mb-20 cursor-pointer underline underline-offset-4">
        //     DocWave ✨{" "}
        //   </h1>
        //   <div className="text-white grid grid-cols-4 gap-5 grid-flow-row text-center w-full">
        //     <p>
        //       You have no documents. Click the green button to create a new
        //       document.
        //     </p>
        //   </div>
        // </div>
        <div className="mx-20">
          {/* <ToggleRight color="white" size={49} onClick={toggleButton} /> */}
          <h1 className="text-5xl text-white text-center mb-20 cursor-pointer underline underline-offset-4 font-bold">
            DocWave ✨{" "}
          </h1>
          <div className="flex space-x-2 items-center">
            <p className="font-bold">Your Documents</p>
            <ToggleRight
              color="white"
              size={49}
              onClick={toggleButton}
              className=""
            />
            <p className="font-bold">Shared</p>
          </div>
          {/* <h2 className="text-white text-3xl my-2">Shared With You</h2> */}
          <div className="text-white grid grid-cols-4 gap-5 grid-flow-row my-8">
            {sharedDocuments.map((document) => (
              // <div
              //   className="bg-[#313338] flex flex-col shadow-md transform
              //                   transition duration-500 hover:scale-110 shadow-gray-700 hover:shadow-gray-500 hover:shadow-xl h-60 w-60 m-2 bg-gradient-to-r from-[#313338] to-gray-700 justify-between p-5"
              //   key={document.id}
              //   onClick={() => handleDocumentClick(document.documentId)}
              // >
              //   <div className="flex justify-between">
              //     <div>{document.document.title}</div>
              //     <Grip className="cursor-pointer" />
              //   </div>
              //   <p className="text-gray-400 mt-2">
              //     Last Opened:{" "}
              //     {format(
              //       new Date(document.document.updatedAt),
              //       "MMM dd HH:mm",
              //     )}
              //   </p>
              //   <p>{document.permissions}</p>
              // </div>
              <Card
                key={document.id}
                // onClick={() => handleDocumentClick(document.documentId)}
              >
                <CardHeader>
                  <CardTitle>{document.document.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-400 mt-2">
                    Last Opened:{" "}
                    {format(
                      new Date(document.document.updatedAt),
                      "MMM dd HH:mm"
                    )}
                  </p>
                  <p>
                    Permissions: <Badge>{document.permissions}</Badge>
                  </p>
                  <div>
                    <Button
                      onClick={() => handleDocumentClick(document.documentId)}
                    >
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
