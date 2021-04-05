import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

const useFirestoreCollection = ({ query, data, dependencies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());

    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubscribe();
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreCollection;
