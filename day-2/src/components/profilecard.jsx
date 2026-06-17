import { useState } from "react";
function Profile_card(props) {
    const [status, setStatus] = useState(false);
    return (
        <div className="profile-card">

            <img src={props.image}
             alt="Profile"
             className="profile-image"
            />
            <h2 className="profile-name">{props.name}</h2>
            <h3 className="profile-role">{props.role}</h3>
            <h4 className="profile-skills">
                {status && (
                    <p>Skills: {props.skills.join(", ")}</p>
                )}
            </h4>
             <button className="skills_button" onClick={() => setStatus(!status)}>
                {status ? "Hide Skills" : "Show Skills"}
            </button>
        </div>
    );
}
export default Profile_card;