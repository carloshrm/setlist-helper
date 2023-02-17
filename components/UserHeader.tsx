import React, { useState, type ReactElement } from 'react';

function UserHeader(): ReactElement {


    return (
        <div>
            <a href="/api/auth/login">Login</a>
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}

export default UserHeader;