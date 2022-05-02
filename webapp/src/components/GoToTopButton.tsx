import React, { useCallback, useState, useEffect, useRef } from 'react';
import "bootswatch/dist/morph/bootstrap.min.css"
import Button from '@mui/material/Button';
import '../styles/GoToTopButton.scss';
import { Grid } from "@mui/material";

const GoToTopButton = () => {

    const [isSticky, setSticky] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownEl = useRef<HTMLUListElement>(null);

    const handleClickOutside = useCallback((e) => {
        if (showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
            setShowDropdown(false);
        }
    }, [showDropdown, setShowDropdown, dropdownEl]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', () => handleScroll);
        }
    }, [handleClickOutside]);

    const handleScroll = () => {
        if (ref && ref.current && ref.current.getBoundingClientRect()) {
            setSticky(ref.current.getBoundingClientRect().top <= 60);
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`sticky__wrapperButton ${isSticky && 'stickyButton'}`} ref={ref}>
            <div className="sticky--innerButton">
                <Grid container justifyContent="flex-end">
                    <Button onClick={scrollToTop} className="backToTop"
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#e8e8e8",
                            fontSize: "18px",
                        }}>
                        &#8679;
                    </Button>
                </Grid>
            </div>
        </div>
    );
}

export default GoToTopButton;