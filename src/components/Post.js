import React, { useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function Post(props) {
  const url = "http://localhost:8080/product";
  //change url

  const [data, setData] = useState({
    cid: "",
    mode: "",
    member_id: "",
    storeid: "",
    posid: "",
    inv: "",
    saledate: "",
    products: [],
    mstamp: "",
    isApplyAccum: "",
    coupon: {
      barcode: "",
      quantity: "",
    },
    tender: {
      tenderno: "",
      amount: "",
    },
    redeems: {
      id: "",
      earn: "",
    },
    localSegments: { segId: "" },
  });

  const cidOptions = [
    { value: "7DELIVERY", label: "7DELIVERY" },
    { value: "POSONL", label: "POSONL" },
    {
      value: "VMACHINE",
      label: "VMACHINE",
      className: "myOptionClassName",
    },
  ];

  const [segId, setSegId] = useState("");

  function handle(e) {
    const newdata = { ...data };
    if (e.id === "BARCODE") {
      newdata.coupon.barcode = e.value;
    } else if (e.id === "QUANTITY") {
      newdata.coupon.quantity = e.value;
    } else if (e.id === "TENDERNO") {
      newdata.tender.tenderno = e.value;
    } else if (e.id === "AMOUNT") {
      newdata.tender.amount = e.value;
    } else if (e.id === "ID") {
      newdata.redeems.id = e.value;
    } else if (e.id === "EARN") {
      newdata.redeems.earn = e.value;
    } else if (e.id === "SEGMENT") {
      newdata.localSegments.segId = e.value;
    } else if (e.id === "cid") {
      if (e.label === "7DELIVERY") {
        setSegId("106000003");
      } else if (e.label === "POSONL") {
        setSegId("106000004");
      } else {
        setSegId("106000005");
      }
      newdata[e.id] = e.label;
    } else {
      newdata[e.id] = e.value;
    }
    setData(newdata);
    console.log(newdata);
  }

  const [productArray, setProductArray] = useState([]);
  const handleAdd = () => {
    const temp = [
      ...productArray,
      {
        // name: "",
        code: "",
        // price: "",
        // pma: "",
        // cat: "",
        // subcat: "",
        quantity: 0,
        // isApply: true,
      },
    ];
    setProductArray(temp);
    // console.log(productArray);
  };
  const handleProducts = (valueChange, i) => {
    const temp = [...productArray];
    temp[i][valueChange.target.id] = valueChange.target.value;
    setProductArray(temp);
    // console.log(productArray);
  };
  const handleDelete = (i) => {
    const temp = [...productArray];
    temp.splice(i, 1);
    setProductArray(temp);
    // console.log(productArray);
  };

  function submit(e) {
    e.preventDefault();
    const temp = { ...data };
    temp.posid = parseInt(temp.posid);
    temp.inv = parseInt(temp.inv);
    productArray.forEach((item) => {
      item.quantity = parseInt(item.quantity);
    });
    temp.products = productArray;
    temp.mstamp = temp.mstamp === "true";
    temp.isApplyAccum = temp.isApplyAccum === "true";
    temp.localSegments.segId = segId;
    temp.saledate = temp.saledate.concat(" 00:00:00");
    Axios.post(url, temp).then((res) => {
      console.log(res.data);
    });
    // console.log(temp);
    // console.log(productArray);
  }
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <p>CID</p>
        <Dropdown
          options={cidOptions}
          onChange={(e) => {
            e.id = "cid";
            console.log(e);
            handle(e);
          }}
          value={data.cid}
          placeholder={"Select an Option"}
          type="text"
        />

        <p>Mode</p>
        <Dropdown
          options={[
            { value: "submit", label: "submit" },
            {
              value: "cancel",
              label: "cancel",
              className: "myOptionClassName",
            },
          ]}
          onChange={(e) => {
            e.id = "mode";
            handle(e);
          }}
          value={data.mode}
          placeholder={"Select an Option"}
          type="text"
        />

        <p>Member ID</p>
        <input
          onChange={(e) => handle(e.target)}
          id="member_id"
          value={data.member_id}
          placeholder="member_id"
          type="text"
        />

        <p>Store ID</p>
        <input
          onChange={(e) => handle(e.target)}
          id="storeid"
          value={data.storeid}
          placeholder="storeid"
          type="text"
        />

        <p>POS ID</p>
        <input
          onChange={(e) => handle(e.target)}
          id="posid"
          value={data.posid}
          placeholder="posid"
          type="number"
        />

        <p>INV</p>
        <input
          onChange={(e) => handle(e.target)}
          id="inv"
          value={data.inv}
          placeholder="inv"
          type="number"
        />

        <div>
          <p>Sale Date</p>
          <input
            onChange={(e) => handle(e.target)}
            id="saledate"
            value={data.saledate}
            placeholder="saledate"
            type="text"
          />
        </div>

        <div>
          <p>Products List</p>
          <button onClick={() => handleAdd()}>Add a product</button>
          {productArray.map((product, i) => {
            return (
              <div key={i}>
                <div>
                  <input
                    id="code"
                    onChange={(e) => handleProducts(e, i)}
                    type="text"
                  />
                  <input
                    id="quantity"
                    onChange={(e) => handleProducts(e, i)}
                    type="text"
                  />
                </div>
                <button onClick={() => handleDelete(i)} />
              </div>
            );
          })}
        </div>

        <p>M Stamp</p>
        <Dropdown
          options={[
            { value: "true", label: "true" },
            {
              value: "false",
              label: "false",
              className: "myOptionClassName",
            },
          ]}
          onChange={(e) => {
            e.id = "mstamp";
            handle(e);
          }}
          value={data.mstamp}
          placeholder={"Select an Option"}
          type="text"
        />

        <p>Is Apply Accum</p>
        <Dropdown
          options={[
            { value: "true", label: "true" },
            {
              value: "false",
              label: "false",
              className: "myOptionClassName",
            },
          ]}
          onChange={(e) => {
            e.id = "isApplyAccum";
            handle(e);
          }}
          value={data.isApplyAccum}
          placeholder={"Select an Option"}
          type="text"
        />

        <p>Coupon</p>
        <input
          onChange={(e) => {
            console.log(e.target);
            handle(e.target);
          }}
          id="BARCODE"
          value={data.coupon.barcode}
          placeholder="barcode"
          type="text"
        />
        <input
          onChange={(e) => handle(e.target)}
          id="QUANTITY"
          value={data.coupon.quantity}
          placeholder="coupon quantity"
          type="text"
        />

        <p>Tender</p>
        <input
          onChange={(e) => handle(e.target)}
          id="TENDERNO"
          value={data.tender.tenderno}
          placeholder="tender tenderno"
          type="text"
        />
        <input
          onChange={(e) => handle(e.target)}
          id="AMOUNT"
          value={data.tender.amount}
          placeholder="tender amount"
          type="text"
        />

        <p>Redeems</p>
        <input
          onChange={(e) => handle(e.target)}
          id="ID"
          value={data.redeems.id}
          placeholder="redeems id"
          type="text"
        />
        <input
          onChange={(e) => handle(e.target)}
          id="EARN"
          value={data.redeems.earn}
          placeholder="redeems earn"
          type="text"
        />
        <div>
          <p>Local Segments</p>
          <input disabled value={segId} />
        </div>
        <div style={{ padding: 20 }}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Post;
