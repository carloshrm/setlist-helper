'use client';
import UserService from '@/services/UserService';
import React, { useEffect, useState, type ReactElement } from 'react';

export default function UserHeader() {
    const [userID, setUserID] = useState("");
    useEffect(() => {
        (async () => {
            setUserID(await UserService.getInstance().GetID());
        })();
    });
    return (
        <div>
            <p>{userID}</p>
        </div>
    );
}