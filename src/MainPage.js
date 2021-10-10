import { useRef, useState } from "react";
import {
  
  Row,
  Button,
  Col,
  FormControl,
  
} from "react-bootstrap";
import TopNav from "./components/TopNav";

import "./css/MainPage.css";
import "./css/SeatchWindow.css";

const SearchComp = ({ setWeatherData }) => {
  const inputEl = useRef(null);

  const handleOK = async () => {
    const response = await fetch(
      `places/${inputEl.current.value}/forecasts/long-term`
    );

    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <>
      <Row>
        <Col>
          <FormControl ref={inputEl} className="InputForm" />
        </Col>
        <Col>
          {" "}
          <Button className="Button" variant="primary" onClick={handleOK}>
            Search
          </Button>
        </Col>
      </Row>
    </>
  );
};

const WeatherData = ({ weatherData }) => {

  const style = (value) => {
    return {
      color: new Date(value) > new Date() ? "red" : "blue",
    };
  };

  const validDates =
    weatherData &&
    weatherData.forecastTimestamps.filter((value, index) => {
      return index % 3 === 0;
    });

  const currentTime = new Date();
  currentTime.setHours(
    currentTime.getHours() + Math.round(currentTime.getMinutes() / 60)
  );
  currentTime.setMinutes(0, 0, 0);

  const weatherObjLenght = weatherData && weatherData.forecastTimestamps.length;
  var dates = [];
  for (let i = 0; i < weatherObjLenght; i++) {
    dates.push(weatherData.forecastTimestamps[i]);
  }
  var sameTime = 0;
  for (let i = 0; i < dates.length; i++) {
    const currentTimeApi = new Date(
      weatherData && weatherData.forecastTimestamps[i].forecastTimeUtc
    );
    if (currentTime.getTime() === currentTimeApi.getTime()) {
      sameTime = weatherData.forecastTimestamps[i];
    }
  }
  var daysRange = [];
  var t = [];
  let weekDays = [];

  var currentDay = [];
  var comingDay = [];
  let third = [];
  let fourth = [];
  let fifth = [];
  let sixth = [];
  let seventh = [];
  for (let i = 0; i < weatherObjLenght; i++) {
    const el = weatherData.forecastTimestamps[i].forecastTimeUtc;
    const today = new Date().toLocaleString("en-us", { weekday: "long" });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const next = tomorrow.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextDate = new Date(tomorrow).getDate();

    const nextThird = new Date();
    nextThird.setDate(nextThird.getDate() + 2);
    const thirdDay = nextThird.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextThird2 = new Date(nextThird).getDate();

    const nextFourth = new Date();
    nextFourth.setDate(nextFourth.getDate() + 3);
    const FourthDay = nextFourth.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextFourth2 = new Date(nextFourth).getDate();
    

    const nextFifth = new Date();
    nextFifth.setDate(nextFifth.getDate() + 4);
    const FifthDay = nextFifth.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextFifth2 = new Date(nextFifth).getDate();

    const nextSixth = new Date();
    nextSixth.setDate(nextSixth.getDate() + 5);
    const SixthDay = nextSixth.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextSixth2 = new Date(nextSixth).getDate();

    const nextSeventh = new Date();
    nextSeventh.setDate(nextSeventh.getDate() + 6);
    const SeventhDay = nextSeventh.toLocaleString("en-us", {
      weekday: "long",
    });
    const nextSeventh2 = new Date(nextSeventh).getDate();

    const todayDate = new Date().getDate();
    const tmp = el.substring(8, 10);
    t.push(new Date(el).toLocaleString("en-us", { weekday: "long" }));
    const f = new Date(el).toLocaleString("en-us", { weekday: "long" });
    if (f == today && tmp == todayDate) {
      currentDay.push(el);
    }
    if (f == next && tmp == nextDate) {
      comingDay.push(el);
    }
    if (f == thirdDay && tmp == nextThird2) {
      third.push(el);
    }
    if (f == FourthDay && tmp == nextFourth2) {
      fourth.push(el);
    }

    if (f == FifthDay && tmp == nextFifth2) {
      fifth.push(el);
    }

    if (f == SixthDay && tmp == nextSixth2) {
      sixth.push(el);
    }
    if (f == SeventhDay && tmp == nextSeventh2) {
      seventh.push(el);
    }

    let filterWeekDay = [...new Set(t)];
    weekDays = filterWeekDay;

    daysRange.push(tmp);


  }

  const currentDayLength = currentDay.length;
  var tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  var todayData = [];

  for (let i = 0; i < currentDayLength; i++) {
    if (
      currentDay[i] == weatherData.forecastTimestamps[i].forecastTimeUtc
    ) {
      todayData.push(weatherData.forecastTimestamps[i]);
    }
  }

  const tomorrowDayLength = comingDay.length;
  var tomorrowData = [];
  let x = 0;
  for (
    let i = currentDayLength;
    i < tomorrowDayLength + currentDayLength;
    i++
  ) {
    const fff = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (comingDay[x] == fff) {
      tomorrowData.push(weatherData.forecastTimestamps[i]);
    }
    x++;
  }
  var thirdData = [];
  const thirdDayLength = third.length;

  let x1 = 0;
  for (
    let i = tomorrowDayLength + currentDayLength;
    i < tomorrowDayLength + currentDayLength + thirdDayLength;
    i++
  ) {
    const thirdApi = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (third[x1] == thirdApi) {
      thirdData.push(weatherData.forecastTimestamps[i]);
    }
    x1++;
  }
  var fourthData = [];
  const fourthDayLength = fourth.length;
  let x2 = 0;
  for (
    let i = tomorrowDayLength + currentDayLength + thirdDayLength;
    i < tomorrowDayLength + currentDayLength + thirdDayLength + fourthDayLength;
    i++
  ) {
    const fourthApi = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (fourth[x2] == fourthApi) {
      fourthData.push(weatherData.forecastTimestamps[i]);
    }
    x2++;
  }
  var fifthData = [];
  const fifthDayLength = fifth.length;
  let x3 = 0;
  for (
    let i =
      tomorrowDayLength + currentDayLength + thirdDayLength + fourthDayLength;
    i <
    tomorrowDayLength +
      currentDayLength +
      thirdDayLength +
      fourthDayLength +
      fifthDayLength;
    i++
  ) {
    const fifthApi = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (fifth[x3] == fifthApi) {
      fifthData.push(weatherData.forecastTimestamps[i]);
    }
    x3++;
  }
  var sixthData = [];
  const sixthDayLength = sixth.length;
  let x4 = 0;
  for (
    let i =
      tomorrowDayLength +
      currentDayLength +
      thirdDayLength +
      fourthDayLength +
      fifthDayLength;
    i <
    tomorrowDayLength +
      currentDayLength +
      thirdDayLength +
      fourthDayLength +
      fifthDayLength +
      sixthDayLength;
    i++
  ) {
    const sixthApi = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (sixth[x4] == sixthApi) {
      sixthData.push(weatherData.forecastTimestamps[i]);
    }
    x4++;
  }
  var seventhData = [];
  const seventhDayLength = seventh.length;
  let x5 = 0;
  for (
    let i =
      tomorrowDayLength +
      currentDayLength +
      thirdDayLength +
      fourthDayLength +
      fifthDayLength +
      sixthDayLength;
    i <
    tomorrowDayLength +
      currentDayLength +
      thirdDayLength +
      fourthDayLength +
      fifthDayLength +
      sixthDayLength +
      seventhDayLength;
    i++
  ) {
    const seventhApi = JSON.stringify(
      weatherData.forecastTimestamps[i].forecastTimeUtc
    ).slice(1, -1);
    if (seventh[x5] == seventhApi) {
      seventhData.push(weatherData.forecastTimestamps[i]);
    }
    x5++;
  }

  var maxValue = Math.max.apply(Math, daysRange);
  var minValue = Math.min.apply(Math, daysRange);


  // const dataByWeekdays = {
  //   sunday: [],
  //   monday: [],
  //   tuesday: [],
  //   wednesday: [],
  //   thursday: [],
  //   friday: [],
  //   saturday: [],
  // };

  // weatherData &&
  //   weatherData.forecastTimestamps.forEach((d) => {
  //     const weekday = new Date(d.forecastTimeUtc).getDay();

  //     switch (weekday) {
  //       case 0:
  //         dataByWeekdays.sunday.push(d);
  //         break;
  //       case 1:
  //         dataByWeekdays.monday.push(d);
  //         break;
  //       case 2:
  //         dataByWeekdays.tuesday.push(d);
  //         break;
  //       case 3:
  //         dataByWeekdays.wednesday.push(d);
  //         break;
  //       case 4:
  //         dataByWeekdays.thursday.push(d);
  //         break;
  //       case 5:
  //         dataByWeekdays.friday.push(d);
  //         break;
  //       case 6:
  //         dataByWeekdays.saturday.push(d);
  //         break;
  //     }
  //   });
  return (
    <>
      <div>
        <Row>
          <Col className="Left-col" sm={2}>
            <Col className="SearchCol">
              <Row className="SearchColRow">
              
                <Col SearchColRow md={4}>
                  <strong className="AirTemp">{sameTime.airTemperature}°</strong>
                </Col>
              </Row>
              <Row className="SearchColRow">
                Now It's: {sameTime.conditionCode}
              </Row>
              <Row className="SearchColRow">
                Wind speed: {sameTime.windSpeed}
              </Row>
              <Row className="SearchColRow">Wind gust: {sameTime.windGust}</Row>
              <Row className="SearchColRow">
                Wind direction: {sameTime.windDirection}
              </Row>
              <Row className="SearchColRow">
                Cloud cover: {sameTime.cloudCover}
              </Row>
              <Row className="SearchColRow">
                Sea level pressure: {sameTime.seaLevelPressure}
              </Row>
              <Row className="SearchColRow">
                Total precipitation: {sameTime.totalPrecipitation}
              </Row>
            </Col>
          </Col>
          <Col className="Right-col" sm={9}>
            <div>
              <Row>
                October {minValue} - {maxValue}
              </Row>
              <Row>
                <Row>
                  <Col>
                    <strong>Today</strong>
                    {todayData &&
                      todayData.map((f, i) => {
                        return (
                          <>
                            <p className="todayTr">
                              {f.airTemperature}°{" "}
                              {new Date(f.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[1]}</strong>
                    {tomorrowData &&
                      tomorrowData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[2]}</strong>
                    {thirdData &&
                      thirdData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[3]}</strong>
                    {fourthData &&
                      fourthData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[4]}</strong>
                    {fifthData &&
                      fifthData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[5]}</strong>
                    {sixthData &&
                      sixthData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                  <Col>
                    <strong>{weekDays[6]}</strong>
                    {seventhData &&
                      seventhData.map((g) => {
                        return (
                          <>
                            <p className="todayTr">
                              {g.airTemperature}°{" "}
                              {new Date(g.forecastTimeUtc).getHours()}H
                            </p>
                          </>
                        );
                      })}
                  </Col>
                </Row>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* {Object.keys(dataByWeekdays).map((weekday) => {
        console.log(dataByWeekdays)
        return dataByWeekdays[weekday].map((days) => {
          return <p>{days.forecastTimeUtc} </p>;
        });
      })} */}
    </>
  );
};

const MainPage = () => {
  const [weatherData, setWeatherData] = useState();
  return (
    <>
      <div className="cont">
        <Row>
          <TopNav />
        </Row>
        <Row className="DataRow">
          <Col sm={4}>
            <SearchComp
              weatherData={weatherData}
              setWeatherData={setWeatherData}
            />
          </Col>
            <WeatherData weatherData={weatherData} />
          
        </Row>
      </div>
    </>
  );
};

export default MainPage;
