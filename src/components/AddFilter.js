import React from 'react';

export default function AddFilter({active, children}) {
    return children.filter(child => child.props.name === active)
}