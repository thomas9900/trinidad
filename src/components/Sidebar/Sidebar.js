import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
import Logo from '../../images/logo.svg'

const Sidebar = () => {
    return (
        <menu className='sidebar'>
            <Link className='sidebar__logo' to='/'>
                <img src={Logo} alt='img'/>
                <i>proovitöö</i>
            </Link>
            <NavLink className='sidebar__list' activeClassName='active' to='/list'>NIMEKIRI</NavLink>
            <NavLink className='sidebar__article' activeClassName='active' to='/article'>ARTIKKEL</NavLink>
        </menu>
    )
}   

export default Sidebar