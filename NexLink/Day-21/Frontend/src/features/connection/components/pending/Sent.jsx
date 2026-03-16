import ConnectionCard from "../cards/ConnectionCard";
import { useConnection } from "../../hook/useConnection";
import { useEffect } from "react";

const sent = () => {
  const { handlegetSentPendingRequest, loading, sentReq } = useConnection();

  useEffect(() => {
    handlegetSentPendingRequest();
  }, []);

  if (loading || !sentReq) {
    return <main>Loading...</main>;
  }

  return (
    <div className="cardCont">
      {sentReq.length === 0 ? (
        <>
         <p className="message">Grow your connection by sending request</p>
        </>
        
      ) : (
        sentReq.map((r) => {
          return (
            <ConnectionCard
              key={r.id}
              user={r.receiver}
              createdAt={r.createdAt}
              btn="Withdraw"
            />
          )
        })
      )}
    </div>
  );
};

export default sent;
