import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";

import './individual.css';

const IndividualSpotPage = () => {

    const { spotId } = useParams();

    const spotsObj = useSelector((state) => state.spotReducer.spots);
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    // const [reviewNum, setReviewNum] = useState(0);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch]);

    const spots = spotsObj[spotId]



    // useEffect(()=>{

    // },[reviewNum])

    let reviewNum = 0;
    if (spots) {
        spots.Reviews.forEach(e => {
            reviewNum += e.rating
        });
        reviewNum /= spots.Reviews.length
    }


    const handleDelete = (e) => {
        e.preventDefault();

        const payload = {
            ...spots
        }
        setErrors([]);

        dispatch(spotActions.deleteSpotThunk(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                    return
                };
            }
        );

        history.push(`/spots`);
    }

    return (
        <div className="individualBigDiv">
            <div className="individual-page-header">
                <div className="spots-name">
                    <h1>{spots?.name}</h1>
                </div>
                <div className="reviews-and-all-kindsofstuff">
                    <div className="reviews-kindastuff">
                        <img className="star-img" src='https://pngimg.com/uploads/red_star/red_star_PNG35.png'></img>
                        <p>{reviewNum ? Math.round(reviewNum * 100) / 100 : ''}</p>
                        <pre> &middot; </pre>
                        <NavLink exact to='/spots/reviews'><p className="ozelP">{spots?.Reviews.length} reviews</p></NavLink>
                        <pre> &middot; </pre>
                        <a target="_blank" href="https://www.airbnb.com/help/article/828/about-superhosts"> <p style={{ fontWeight: "normal", textDecoration: "underline", color: "rgba(0,0,0,0.7)", fontSize: "14px" }}>Superhost</p></a>
                        <pre> &middot; </pre>
                        <p className="greyclasscountrystatecity">{spots?.city},{spots?.state},{spots?.country}</p>
                    </div>
                </div>
            </div>
            <div className="individual-images">
                <img className="bigImg" src={spots?.img1}></img>
                <img className="smallImgs2" src={spots?.img2}></img>
                <img className="smallImgs3" src={spots?.img3}></img>
            </div>
            <NavLink exact to={`/spots/${spots?.id}/edit`}><button>Edit</button></NavLink>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>

        </div>
    )
}


export default IndividualSpotPage;