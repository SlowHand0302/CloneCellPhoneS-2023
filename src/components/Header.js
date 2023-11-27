import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// icon
import { BiSearchAlt2 } from 'react-icons/bi';
import { SlBag, SlLocationPin } from 'react-icons/sl';
import { HiOutlineUserCircle, HiOutlinePhone, HiOutlineTruck } from 'react-icons/hi2';
import { LuMenuSquare } from 'react-icons/lu';
import { IoIosArrowDown } from 'react-icons/io';

// file
import styles from './Header.module.scss';
import images from '../assets/img';
import Catalog from './Catalog';

function Header() {
    const [showCatalogModal, setShowCatalogModal] = useState(false);
    const [isMouseOnModal, setIsMouseOnModal] = useState(true);

    const handleCloseModal = () => {
        if (isMouseOnModal) {
            setShowCatalogModal(isMouseOnModal);
        }
    };

    const handleMouseOnModal = (data) => {
        setIsMouseOnModal(data);
    };

    return (
        <>
            <header className={clsx(styles.wrapper)}>
                <nav className={clsx(styles.content)}>
                    <Link to="/">
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <div
                        className={clsx(styles.menuButton, styles.btn)}
                        onClick={() => setShowCatalogModal(!showCatalogModal)}
                    >
                        <LuMenuSquare className={clsx(styles.icon)} /> Danh mục
                    </div>
                    <div className={clsx(styles.localStoreButton, styles.btn)}>
                        <SlLocationPin className={clsx(styles.icon)} />
                        <div className={clsx(styles.localStoreContent)}>
                            <div className={clsx(styles.localStoreTitle)}>
                                <p>Xem giá tại</p>
                                <IoIosArrowDown />
                            </div>
                            <p>Hồ chí minh</p>
                        </div>
                    </div>
                    <form>
                        <div className={clsx(styles.searchBar)}>
                            <button type="submit">
                                <BiSearchAlt2 className={clsx(styles.icon)} />
                            </button>
                            <input className={clsx(styles.inputGroupBtn)} placeholder="Bạn cần tìm gì?"></input>
                        </div>
                    </form>
                    <Link to="/">
                        <div className={clsx(styles.contactButton)}>
                            <HiOutlinePhone className={clsx(styles.icon)} />
                            <p>
                                Gọi mua Hàng
                                <br />
                                1800.2097
                            </p>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={clsx(styles.localStoreButton)}>
                            <SlLocationPin className={clsx(styles.icon)} />
                            <div className={clsx(styles.localStoreContent)}>
                                Cửa hàng <br /> gần bạn
                            </div>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className={clsx(styles.cartButton)}>
                            <HiOutlineTruck className={clsx(styles.icon)} />
                            Tra cứu <br /> đơn hàng
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className={clsx(styles.cartButton)}>
                            <SlBag className={clsx(styles.icon)} />
                            Giỏ <br /> Hàng
                        </div>
                    </Link>
                    <Link to="/login">
                        <div className={clsx(styles.loginButton, styles.btn)}>
                            <HiOutlineUserCircle className={clsx(styles.icon)} />
                            Đăng nhập
                        </div>
                    </Link>
                </nav>
            </header>

            {showCatalogModal ? (
                <div className={clsx(styles.catalogDropDownModal)} onPointerDown={handleCloseModal}>
                    <Catalog isDropDown={showCatalogModal} handleMouseOnModal={handleMouseOnModal} />
                </div>
            ): null}
        </>
    );
}

export default Header;
