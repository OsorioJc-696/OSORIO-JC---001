import React from 'react';

const Profile = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile! Here you can view and update your personal information.</p>
            <div>
                <h2>Your Details</h2>
                <form>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;