export default function AboutFilter({active, children}) {
    return children.filter(child => child.props.name === active)
}