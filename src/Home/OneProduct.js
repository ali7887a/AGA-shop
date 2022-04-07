import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActionOneProduct , ActionCounter, ActionRefresh } from "../action";
import ReactLoading from "react-loading";
import { Rating } from "react-simple-star-rating";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiHomeSmile, BiCheckShield, BiSupport , BiWinkSmile } from "react-icons/bi";
import { BsBagCheck, BsTruck } from "react-icons/bs";
import { FcSafe } from "react-icons/fc";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { GiPayMoney, GiReturnArrow } from "react-icons/gi";
const OneProduct = () => {
  const count = useSelector(e=>e.count)
  const[buy , setBuy] = useState(false)
  const[Status , setStatus] = useState(false)
  const dispatch = useDispatch();
  const { OneProduct, Loading } = useSelector((e) => e.OneProduct);
  const { productID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(ActionOneProduct(productID));
  }, [productID]);
    // define an array to get all the keys from local storage to check if its available did not reCounting
    var myArray = [];
    for (var i = 0; i < Object.entries(localStorage).length; i++) {
    myArray.push(Object.entries(localStorage)[i][0]);
    }
  // all the condition for counter
  if(buy===true){localStorage.setItem(String(OneProduct.name) ,String(count))}
  if(myArray.filter((item)=> item===OneProduct.name).length>0){localStorage.setItem(String(OneProduct.name) ,localStorage.getItem(String(OneProduct.name)))}
  const RemoveCounter =()=>{
    localStorage.removeItem(OneProduct.name)
    dispatch(ActionCounter(-1))
  }
  useEffect(()=>{
    dispatch(ActionCounter(0 , true))
  },[OneProduct.name])
  useEffect(()=>{
    if(localStorage.getItem(OneProduct.name)>=1){
      setStatus(true);
    }
    if(!localStorage.getItem(OneProduct.name)){
      setStatus(false)
    }
  },[OneProduct])
  
  return (
    <>
      <Button className="back" variant="danger" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIosNew />
        back
      </Button>
      {Loading ? (
        <ReactLoading
          type="bubbles"
          color="#F1B814"
          height={150}
          width={100}
          className="Loading"
        />
      ) : (
        <div className="cards">
          <div
            className="card mb-3"
            style={{ maxWidth: "750px", border: "none" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                {OneProduct.image && (
                  <img
                    src={require(`.${OneProduct.image}`)}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 style={{ color: "#F1B814", fontFamily: "Light" }}>
                    Category: {OneProduct.category}
                  </h5>
                  <h5 className="card-title" style={{ color: "#490B3D" }}>
                    {OneProduct.name}
                  </h5>
                  <h6 className="card-title">{OneProduct.brand}</h6>
                  <p className="card-text">{OneProduct.description}</p>
                  <div>
                    <Rating size={25} ratingValue={OneProduct.rating * 20} />{" "}
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      views: {OneProduct.numReviews}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card className="sellerCard">
            <Card.Body>
              <Card.Title>Seller:</Card.Title>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BiHomeSmile style={{ fontSize: "130%" }} /> AGA Online Shop
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BiCheckShield style={{ fontSize: "130%" }} /> Guarantee of
                authenticity and physical health of the product
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BsBagCheck style={{ fontSize: "130%" }} /> Available in AGA
                Store{" "}
              </Card.Text>
              <Card.Text style={{ fontFamily: "Medium" }}>
                <BsTruck style={{ fontSize: "130%" }} /> Posted by AGA
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                {" "}
                Price: {"  "}
                <Button
                  variant="danger"
                  style={{ backgroundColor: "#490B3D", border: "none" }}
                >
                  {" "}
                  {OneProduct.price}$
                </Button>
              </ListGroupItem>
              {OneProduct.countInStock == 0 ? (
                <Button style={{ backgroundColor: "#F1B814", border: "none" }}>
                  Not available
                </Button>
              ) : (
                <ListGroupItem style={{ color: "#490B3D" }}>
                  {" "}
                  Stock: {OneProduct.countInStock-localStorage.getItem(OneProduct.name)}
                </ListGroupItem>
              )}
              {OneProduct.countInStock == 0 ? (
                <Button
                  onClick={() =>
                    alert(
                      "we will send you a notification if is it available , AGA Manager."
                    )
                  }
                >
                  Report available
                </Button>
              ) : (
                <>
                  {buy||Status ? (
                    <div className="count">
                      {count<=1 ? (
                        <Button
                          variant="outline-danger"
                          style={{ border: "none" }}
                          onClick={()=>{RemoveCounter();setBuy(false);dispatch(ActionCounter(-1)); setStatus(false);dispatch(ActionRefresh(false))}}
                        >
                          <RiDeleteBin5Fill 
                            style={{ fontSize: "120%", border: "none" }}
                          />
                        </Button>
                      ) : (
                        <Button
                        onClick={()=>{dispatch(ActionCounter(-1));setBuy(true)}}
                          style={{ fontSize: "150%", border: "none" }}
                          variant="outline-danger"
                        >
                          -
                        </Button>
                      )}{" "}
                      {myArray.filter((item)=> item===OneProduct.name).length>0 ? <span style={{ fontSize: "150%", margin: "auto" }}>{localStorage.getItem(OneProduct.name)}</span>: <span style={{ fontSize: "150%", margin: "auto" }}>{count}</span>}
                      <Button
                        onClick={()=>{dispatch(ActionCounter(+1));setBuy(true)}}
                        variant="outline-success"
                        style={{fontSize:"150%", border:"none"}}
                        disabled={count>=OneProduct.countInStock}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button variant="success" onClick={()=>{setBuy(true);dispatch(ActionRefresh(true))}}>+Add to cart </Button>
                  )}
                  {count>=OneProduct.countInStock&&<p style={{marginLeft: "auto" , marginRight: 'auto' , color:'red'}}>Buy All <BiWinkSmile/></p>}
                </>
              )}
            </ListGroup>
          </Card>
        </div>
      )}
      <br />
      <Card className="text-center footer">
        <Card.Footer className="text-muted footerItem">
          <span style={{ fontFamily: "Medium" }}>
            <FcSafe style={{ fontSize: "200%" }} /> Safe Post
          </span>{" "}
          <span style={{ fontFamily: "Medium" }}>
            {" "}
            <BiSupport style={{ fontSize: "200%" }} />
            Support 24H{" "}
          </span>{" "}
          <span style={{ fontFamily: "Medium" }}>
            {" "}
            <GiPayMoney style={{ fontSize: "200%" }} />
            Pay at the spot{" "}
          </span>{" "}
          <span style={{ fontFamily: "Medium" }}>
            <GiReturnArrow style={{ fontSize: "200%" }} /> 7 days money back
            guarantee
          </span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default OneProduct;
