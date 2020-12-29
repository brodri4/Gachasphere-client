export default function AddFilter({active, children}) {
    return children.filter(child => child.props.name === active)
}