import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Document } from "../types/document";
import { Socket } from "socket.io-client";
import Editor from "../components/Editor";
import { Share } from "lucide-react";
import ShareModal from "../components/ShareModal";
import { Button } from "@/components/ui/button";

type Props = {
  socket: Socket;
};
const DocumentView = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [permission, setPermission] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShareClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleShareSubmit = async (email: string, permission: string) => {
    if (permission == "none" || !permission) {
      return;
    }
    const { data } = await axios.post(`/document/share/${id}`, {
      email,
      permissions: permission,
    });
    console.log(data);
    setShowModal(false);
  };
  const [document, setDocument] = useState<Document | null>(null);
  useEffect(() => {
    const fetchDocument = async () => {
      const { data } = await axios.get(`/document/${id}`);
      setPermission(data.permission);
      setDocument(data.document);
    };
    fetchDocument();
  }, []);
  useEffect(() => {
    props.socket.emit("document", id);
    return () => {
      props.socket.emit("leave", id);
    };
  }, [props.socket, id]);
  return (
    <div className="h-full w-full p-10 text-white flex flex-col items-center gap-5 mb-20">
      <h1
        className="text-3xl mb-3 border-b-2 cursor-pointer font-bold "
        onClick={() => navigate("/")}
      >
        DocWave ✨
      </h1>
      <div className="h-full w-full">
        <div className="flex justify-between mb-6">
          <div className="text-2xl ">{document?.title}</div>
          <Button className="mr-5 flex gap-2" onClick={handleShareClick}>
            {permission === undefined ? (
              <>
                <Share size={20} className="" />
                <div className="text-lg">Share</div>
              </>
            ) : (
              <></>
            )}
          </Button>
          
          {showModal && (
            <ShareModal
              onClose={handleModalClose}
              onSubmit={handleShareSubmit}
            />
          )}
        </div>
        <Editor socket={props.socket} />
      </div>
    </div>
  );
};

export default DocumentView;
