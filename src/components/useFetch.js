import { useState, useEffect } from "react";
import db from "../config/firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { doc, onSnapshot, collection, query, where,setDoc } from "firebase/firestore";
const useFetch = (name) => {
    const [id, setid] = useState(0);
    const query2= collection(db,`quiz/${name}/questions`);
    var [qs,loading2,error2]=useCollectionData(query2);
    if(qs)
        setid(qs.length);

  return [id];
};

export default useFetch;