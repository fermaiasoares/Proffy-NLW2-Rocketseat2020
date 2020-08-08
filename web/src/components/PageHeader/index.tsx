import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (propos) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backImg} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt=""/>
            </div>

            <div className="header-content">
                <strong>{propos.title}</strong>
                { propos.description && <p>{propos.description}</p> }
                {propos.children}
            </div>
        </header>
    );
}

export default PageHeader;