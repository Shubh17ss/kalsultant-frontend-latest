import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { MdKeyboardArrowDown } from 'react-icons/md'

/* ------------------------------------------------------------------
   CosmicSelect — a MUI <Select> dressed in the KalSultant cosmic theme.
   Replaces native <select> elements whose OS-rendered option lists
   clashed with the dark/gold design system.

   Props:
     value      current value (string)
     onChange   (value) => void   — receives the value directly
     options    [{ value, label, disabled? }]
     placeholder text shown when value is empty
     shape      'rounded' (0.7rem, schedule form) | 'pill' (999px, newsletter)
     height     control height (default 46)
     ariaLabel  accessible label
     className   passthrough class
   ------------------------------------------------------------------ */

const GOLD = '#f0b85c'
const INK = '#f9f6ee'
// Fixed line-box height the control's padding is computed around.
const LINE_BOX = 23

const controlSx = (shape, height) => ({
    width: '100%',
    fontFamily: "'FuturaNowReg', sans-serif",
    fontSize: shape === 'pill' ? '0.95rem' : '1rem',
    letterSpacing: shape === 'pill' ? '0.3px' : 'normal',
    color: INK,
    backgroundColor: shape === 'pill' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)',
    borderRadius: shape === 'pill' ? '999px' : '0.7rem',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '& .MuiSelect-select': {
        boxSizing: 'border-box',
        // Height comes from symmetric vertical padding around a fixed line box —
        // an explicit `height` on this element is ignored by MUI's own input rules.
        minHeight: 'unset',
        lineHeight: `${LINE_BOX}px`,
        paddingTop: `${(height - LINE_BOX) / 2}px`,
        paddingBottom: `${(height - LINE_BOX) / 2}px`,
        paddingRight: '2.6rem',
        paddingLeft: shape === 'pill' ? '1.2rem' : '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: shape === 'pill' ? 'rgba(249,246,238,0.18)' : 'rgba(249,246,238,0.14)',
        transition: 'border-color 0.3s ease',
    },
    // The outline's <legend><span> is a bare <span>; the global `span { font-size:
    // 54px }` (HeroSection legacy) inflates it and balloons the outline into a
    // phantom empty box below the field. Collapse it — there is no floating label.
    '& .MuiOutlinedInput-notchedOutline legend': {
        maxWidth: 0,
        lineHeight: 0,
    },
    '& .MuiOutlinedInput-notchedOutline legend span': {
        fontSize: 0,
        lineHeight: 0,
        width: 'auto',
        padding: 0,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(240,184,92,0.4)',
    },
    '&.Mui-focused': {
        backgroundColor: shape === 'pill' ? 'rgba(240,184,92,0.06)' : 'rgba(255,255,255,0.08)',
        boxShadow: shape === 'pill' ? '0 0 22px rgba(240,184,92,0.18)' : 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(240,184,92,0.6)',
        borderWidth: '1px',
    },
    '& .MuiSelect-icon': {
        color: GOLD,
        right: shape === 'pill' ? '1.1rem' : '0.85rem',
        fontSize: '1.35rem',
        transition: 'transform 0.25s ease',
    },
    '& .MuiSelect-iconOpen': {
        transform: 'rotate(180deg)',
    },
})

const menuPaperSx = {
    mt: 0.8,
    backgroundColor: 'rgba(8,6,24,0.96)',
    backgroundImage: 'linear-gradient(180deg, rgba(20,16,46,0.97), rgba(8,6,24,0.98))',
    border: '1px solid rgba(240,184,92,0.22)',
    borderRadius: '14px',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 18px 50px rgba(0,0,0,0.55), 0 0 30px rgba(139,108,255,0.14)',
    color: INK,
    maxHeight: '18rem',
    '& .MuiMenuItem-root': {
        fontFamily: "'FuturaNowReg', sans-serif",
        fontSize: '0.92rem',
        color: 'rgba(249,246,238,0.82)',
        borderRadius: '9px',
        margin: '3px 6px',
        padding: '0.55rem 0.85rem',
        transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    '& .MuiMenuItem-root:hover': {
        backgroundColor: 'rgba(240,184,92,0.12)',
        color: INK,
    },
    '& .MuiMenuItem-root.Mui-selected': {
        backgroundColor: 'rgba(240,184,92,0.18)',
        color: GOLD,
    },
    '& .MuiMenuItem-root.Mui-selected:hover': {
        backgroundColor: 'rgba(240,184,92,0.24)',
    },
    // tidy gold-tinted scrollbar for long lists
    '&::-webkit-scrollbar': { width: '8px' },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(240,184,92,0.3)',
        borderRadius: '8px',
    },
}

export const CosmicSelect = ({
    value,
    onChange,
    options = [],
    placeholder = 'Select',
    shape = 'rounded',
    height = 46,
    ariaLabel,
    className = '',
    disabled = false,
}) => {
    return (
        <Select
            className={className}
            value={value ?? ''}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            IconComponent={MdKeyboardArrowDown}
            inputProps={{ 'aria-label': ariaLabel || placeholder }}
            renderValue={(selected) => {
                // Explicit reset: a global `span { font-size: 54px; width: 55%;
                // line-height: 5rem }` rule (HeroSection legacy) would otherwise
                // inflate/constrain the rendered value text.
                const reset = { font: 'inherit', letterSpacing: 'inherit', lineHeight: 'normal', width: 'auto' }
                if (selected === '' || selected === undefined || selected === null) {
                    return <span style={{ ...reset, color: 'rgba(249,246,238,0.4)' }}>{placeholder}</span>
                }
                const opt = options.find((o) => o.value === selected)
                return <span style={reset}>{opt ? opt.label : selected}</span>
            }}
            sx={controlSx(shape, height)}
            MenuProps={{
                disableScrollLock: true,
                slotProps: {
                    paper: { sx: menuPaperSx },
                    list: { sx: { py: 0.4 } },
                },
                transformOrigin: { vertical: 'top', horizontal: 'left' },
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            }}
        >
            {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                </MenuItem>
            ))}
        </Select>
    )
}
