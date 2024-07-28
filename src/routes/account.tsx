import React, { useEffect, useState } from "react";
import { UserAuth } from '../context/AuthContext';
import { getDatabase, ref, onValue } from "firebase/database";
import { ICharacter } from "../types";

function Account() {
    const { user, logout } = UserAuth();

    const [characters, setCharacters] = useState([]);

    const db = getDatabase();

    useEffect(() => {
      const charactersRef = ref(db, `characters/${user?.uid}`);
      onValue(charactersRef, (snapshot) => {
        if (snapshot.exists()) {
          setCharacters(snapshot.val());
        } else {
          console.log('Database entry not found');
          setCharacters([]);
        }
      });
    }, [user])

    const handleSignOut = async () => {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      }
    }
    
    return (
        <>
        <h1>
            Welcome {user!.displayName}
        </h1>
        <h3>Characters</h3>
        <ul>
          {characters.map((character: ICharacter, index) => (
            <li key={index}>{character.characterName}</li>
          ))}
        </ul>
        <button onClick={handleSignOut}>Logout</button>
        </>
    )
}

export default Account;