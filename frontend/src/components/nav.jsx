import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/nav.scss';

export default function Nav() {
    return (
        <nav>
            <Link to="/" className="nav-item">
                all
            </Link>
            <Link to="/explore" className="nav-item">
                explore
            </Link>
            <Link to="/new" className="nav-item">
                upload
            </Link>
            <Link to="/" className="nav-item">
                gitlab
            </Link>
        </nav>
    )
}
