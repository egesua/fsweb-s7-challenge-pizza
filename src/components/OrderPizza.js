import React from "react";
import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import ReactLogo from "./logo.svg";

export default function Pizza(props) {
  const [formData, setFormData] = useState({});
  const [hataMesaji, setHataMesaji] = useState("");
  const [pizzaAdet, setPizzaAdet] = useState(1);
  const [pizzaFiyati, setPizzaFiyati] = useState(110);
  const [malzemeFiyati, setMalzemeFiyati] = useState(0);

  const boyutFiyat = {
    small: 110,
    medium: 150,
    large: 190,
  };

  let userSchema = object({
    boyut: string().required("Boyut seçmelisiniz"),
    hamur: string().required("Hamur tipi seçmelisiniz"),
  });

  function changeHandler(e) {
    // Değişen inputun değerini alıyoruz
    // value, type ve checked input html elementlerinin özellikleri
    let { value, type, checked } = e.target;

    if (type === "checkbox") {
      // Checkbox ise malzeme seçildiği veya seçilmediği durumuna göre fiyatı güncelliyoruz
      value = checked;
      if (checked) {
        setMalzemeFiyati(malzemeFiyati + 5);
      } else {
        setMalzemeFiyati(malzemeFiyati - 5);
      }
    }

    if (type === "radio") {
      // Pizza boyutu seçildiğinde fiyatı güncelliyoruz
      setPizzaFiyati(boyutFiyat[value]);
    }

    // Form verilerini güncelliyoruz
    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      // Form verilerini validate ediyoruz. userSchema yapısı ile kontrol ediyoruz
      await userSchema.validate(formData);
    } catch (err) {
      // Hata varsa hata mesajını güncelliyoruz
      setHataMesaji(err.message);
      return;
    }

    // Hata yoksa hata mesajını temizliyoruz
    setHataMesaji("");

    // Form verilerini POST ile gönderiyoruz
    axios
      .post("https://reqres.in/api/orders", formData)
      .then(function(response) {
        // Sipariş başarılı bir şekilde oluşturulduğunda siparişleri güncelliyoruz
        props.addSiparis(response.data);
        window.location.href = "/success";
      })
      .catch(function(error) {
        // Sipariş oluşturulurken hata oluştuğunda hata mesajını kullanıcıya gösteriyoruz
        if (error.message === "Network Error") {
          alert("İnternet bağlantınızı kontrol edin");
        }
      });
  }

  return (
    <div className="pizzaDiv">
      <div className="header">
        <img src={ReactLogo}></img>
      </div>
      <div className="breadcrumbs">
        <div>
          <a href="/">Anasayfa</a>
          <a href="/secenekler">Seçenekler</a>
          <a href="/pizza">Sipariş Oluştur</a>
        </div>
      </div>

      <div className="content content-height">
        <h1>Position Absolute Acı Pizza</h1>
        <div className="top-fiyat">
          <p>{pizzaAdet * (pizzaFiyati + malzemeFiyati)} ₺</p>
        </div>
        <p>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
        <p style={{ color: "#e84a5f" }}>{hataMesaji}</p>
        <form id="pizza-form" onSubmit={handleSubmit}>
          <div className="row first-row">
            <div className="column boyutSec">
              <h2>Boyut Seç *</h2>
              <div>
                <input
                  type="radio"
                  id="small"
                  name="boyut"
                  value="small"
                  onChange={changeHandler}
                />
                <label htmlFor="small">Küçük</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="medium"
                  name="boyut"
                  value="medium"
                  onChange={changeHandler}
                />
                <label htmlFor="medium">Orta</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="large"
                  name="boyut"
                  value="large"
                  onChange={changeHandler}
                />
                <label htmlFor="large">Büyük</label>
              </div>
            </div>
            <div className="column">
              <h2>Hamur Seç *</h2>
              <select
                id="pizza"
                name="hamur"
                defaultValue="none"
                onChange={changeHandler}
              >
                <option value="none" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>

          <h2>Ek Malzemeler</h2>
          <hr></hr>
          <h4>En Fazla 10 malzeme seçebilirsiniz. 5₺</h4>
          <div className="row ikinci-row">
            {[
              "Pepperoni",
              "Sosis",
              "Kanada Jambonu",
              "Tavuk Izgara",
              "Soğan",
              "Domates",
              "Mısır",
              "Sucuk",
              "Jalepeno",
              "Sarımsak",
              "Biber",
              "Ananas",
              "Kabak"
            ].map((malzeme, index) => (
              <div key={index}>
                <div className="column">
                  <input
                    type="checkbox"
                    id={`topping-${malzeme.toLowerCase().replace(" ", "-")}`}
                    name={`malzeme${index + 1}`}
                    value={malzeme.toLowerCase().replace(" ", "-")}
                    onChange={changeHandler}
                  />
                  <label
                    htmlFor={`topping-${malzeme
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {malzeme}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <label htmlFor="special-text" className="siparisNotu">
            Sipariş Notu
          </label>
          <textarea
            id="special-text"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            name="özel"
            onChange={changeHandler}
          />

          <hr />

          <div className="row ucuncu-row">
            <div className="column">
              <div className="button-group">
                {/* Pizza adetini secmemi saglayan bir button grubu */}
                <button
                  id="pizza-minus"
                  type="button"
                  onClick={() => {
                    if (pizzaAdet > 1) {
                      setPizzaAdet(pizzaAdet - 1);
                    }
                  }}
                >
                  -
                </button>
                <input
                  id="pizza-quantity"
                  type="number"
                  name="pizzaAdet"
                  value={pizzaAdet}
                  onChange={changeHandler}
                />
                <button
                  id="pizza-plus"
                  type="button"
                  onClick={() => {
                    setPizzaAdet(pizzaAdet + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="column bottom-column">
              <div>
                <h1>Sipariş Toplamı</h1>
                <div className="siparis-toplam">
                  <div className="fiyat-bottom">
                    <p>Seçimler</p>
                    <p>{malzemeFiyati} ₺</p>
                  </div>
                  <div className="fiyat-bottom">
                    <p className="total-p">Toplam</p>
                    <p className="total-p">{pizzaAdet * (pizzaFiyati + malzemeFiyati)} ₺</p>
                  </div>
                </div>
                <button id="order-button" type="submit">
                  Sipariş Ver
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}