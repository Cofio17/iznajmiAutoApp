import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const ITEM_HEIGHT = 48;

export default function LongMenu({ options }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (action) => {
        setAnchorEl(null);
        if (action) {
            action(); // Poziva funkciju za odabranu opciju
        }
    };

    return (
        <div>
            <FontAwesomeIcon
                aria-label="more"
                icon={faEllipsisVertical}
                aria-hidden="false"
                role="button"
                tabIndex="0"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                style={{ cursor: 'pointer', height: '20px' }}

            />

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null)}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 7.5,
                            width: '30ch',
                        },
                    },
                }}
            >
                {options.map(({ label, action }) => (
                    <MenuItem
                        key={label}
                        className="menu-long"
                        onClick={() => handleClose(action)}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>

        </div>
    );
}
