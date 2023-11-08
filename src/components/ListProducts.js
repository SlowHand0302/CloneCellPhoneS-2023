import clsx from 'clsx';
import { Link } from 'react-router-dom';

// icon
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from './ListProducts.module.scss';
import { useState } from 'react';

function formatCash(numb) {
    const str = numb.toString();
    return (
        str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            }) + '₫'
    );
}

function ListProducts(props) {
    const productItems = props.data || [];
    const isSlideShow = props.isSlideShow;

    // slide setting
    const index = props.index;
    const translatePercent = props.translatePercent;

    const [isHoverWishListBtn, setIsHoverWishListBtn] = useState(-1);
    return (
        <div
            className={clsx(styles.productItems, { [styles.overFlowX]: isSlideShow })}
            style={{ transform: `translate3d(${-index * translatePercent}%,0,0)` }}
        >
            {productItems.map((item, index) => {
                let isPreferential = false;
                let isSaleOff = false;
                if (item.peferential.length > 0) {
                    isPreferential = true;
                }
                if (item.oldPrice > 0 && item.percentOff != null) {
                    isSaleOff = true;
                }

                return (
                    <Link to="/" key={index} className={clsx(styles.productItem)}>
                        <div className={clsx(styles.percentOffRibbon,{[styles.active]: isSaleOff})}>
                            <p className={clsx(styles.percentOffDetail)}>Giảm {item.percentOff}</p>
                        </div>
                        <div className={clsx(styles.productImg)}>
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className={clsx(styles.productDetails)}>
                            <h3 className={clsx(styles.productName)}>{item.name}</h3>

                            <div className={clsx(styles.productPrices)}>
                                <div className={clsx(styles.activePrice)}>
                                    {formatCash(item.newPrice)}
                                    <span className={clsx(styles.oldPrice, { [styles.active]: isSaleOff })}>
                                        {formatCash(item.oldPrice)}
                                    </span>
                                </div>
                                <div style={item.updatePrice > 0 ? { display: 'block' } : { display: 'none' }}>
                                    Giá lên đời:{' '}
                                    <span className={clsx(styles.activePrice)}>{formatCash(item.updatePrice)}</span>
                                </div>
                            </div>
                            <div
                                className={clsx(styles.productPeferential, {
                                    [styles.active]: isPreferential,
                                })}
                            >
                                <p>{item.peferential[0]}</p>
                            </div>

                            <div className={clsx(styles.productRate)}>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <div
                            className={clsx(styles.wishListBtn)}
                            onMouseEnter={() => setIsHoverWishListBtn(index)}
                            onMouseLeave={() => setIsHoverWishListBtn(-1)}
                        >
                            Yêu thích
                            {isHoverWishListBtn === index ? (
                                <AiFillHeart className={clsx(styles.wishListIcon)} />
                            ) : (
                                <AiOutlineHeart className={clsx(styles.wishListIcon)} />
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ListProducts;