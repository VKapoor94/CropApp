import './App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import MinMax from './interface/MinMax';
import ModelData from './data/ModelData';
import UserSubmitForm from './interface/UserSubmitForm'
import initialValue from './interface/ModelInitialValue'
import MinMaxData from './data/MinMaxData';

const App: React.FC = () => {
  let logo = ''

  const [modelData, setModelData] = useState<ModelData>(initialValue);

  const [minMax, setMinMax] = useState<MinMax>(MinMaxData)

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    axios.get(baseURL + '/ranges').then((response) => {
      setMinMax(response.data);
    });
  }, [])
  console.log("minMax", minMax)
  const validationSchema = Yup.object().shape({
    Potassium: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Potassium is required and in the range of ${minMax && minMax?.Potassium.start} and ${minMax && minMax.Potassium.end} `).min(minMax.Potassium.start).max(minMax.Potassium.end),
    Humidity: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Humidity is required and in the range of ${minMax && minMax?.Humidity.start} and ${minMax && minMax.Humidity.end} `).min(minMax.Humidity.start).max(minMax.Humidity.end),
    Nitrogen: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Nitrogen is required and in the range of ${minMax && minMax?.Nitrogen.start} and ${minMax && minMax.Nitrogen.end} `).min(minMax.Nitrogen.start).max(minMax.Nitrogen.end),
    Ph: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Ph is required and in the range of ${minMax && minMax?.Ph.start} and ${minMax && minMax.Ph.end} `).min(minMax.Ph.start).max(minMax.Ph.end),
    Phosporus: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Phosporus is required and in the range of ${minMax && minMax?.Phosporus.start} and ${minMax && minMax.Phosporus.end} `).min(minMax.Phosporus.start).max(minMax.Phosporus.end),
    Rainfall: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Rainfall is required and in the range of ${minMax && minMax?.Rainfall.start} and ${minMax && minMax.Rainfall.end} `).min(minMax.Rainfall.start).max(minMax.Rainfall.end),
    Temperature: Yup.number().transform((value) => Number.isNaN(value) ? null : value).nullable().required(`Temperature is required and in the range of ${minMax && minMax?.Temperature.start} and ${minMax && minMax.Temperature.end} `).min(minMax.Temperature.start).max(minMax.Temperature.end),

  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });
  const getImage = (image: {result:string}) => {
    switch (image?.result.toLowerCase()) {
      case 'apple':
        return (<img width={"350"} height={"300"}  src={require('./images/apple.jpg')}/> );
      case 'banana':
        return (<img width={"350"} height={"300"}  src={require('./images/banana.jpg')}/> );
      case 'blackgram':
        return (<img width={"350"} height={"300"}  src={require('./images/blackgram.jpg')}/> );
      case 'chickpea':
        return (<img width={"350"} height={"300"}  src={require('./images/chickpea.jpg')}/> );
      case 'coconut':
        return (<img width={"350"} height={"300"}  src={require('./images/Coconut.jpg')}/> );
      case 'coffee':
        return (<img width={"350"} height={"300"}  src={require('./images/coffee.jpg')}/> );
      case 'cotton crop':
      case 'cotton':
        return (<img width={"350"} height={"300"}  src={require('./images/Cotton crop.jpg')}/> );
      case 'grapes':
        return (<img width={"350"} height={"300"}  src={require('./images/grapes.jpg')}/> );
      case 'jute crop':
      case 'jute':
        return (<img width={"350"} height={"300"}  src={require('./images/Jute crop.jpg')}/> );
      case 'kidneybeans':
        return (<img width={"350"} height={"300"}  src={require('./images/kidneybeans.jpg')}/> );
      case 'lentil':
        return (<img width={"350"} height={"300"}  src={require('./images/lentil.jpg')}/> );
      case 'maize crop':
      case 'maize':
        return (<img width={"350"} height={"300"}  src={require('./images/Maize crop.jpg')}/> );
      case 'mango':
        return (<img width={"350"} height={"300"}  src={require('./images/mango.jpg')}/> );
      case 'mothbeans':
        return (<img width={"350"} height={"300"}  src={require('./images/mothbeans.jpg')}/> );
      case 'mungbeans':
        return (<img width={"350"} height={"300"}  src={require('./images/mungbean.jpg')}/> );
      case 'muskmelon':
        return (<img width={"350"} height={"300"}  src={require('./images/muskmelon.jpg')}/> );
      case 'orange':
        return (<img width={"350"} height={"300"}  src={require('./images/orange.jpg')}/> );
      case 'papaya':
        return (<img width={"350"} height={"300"}  src={require('./images/papaya.jpg')}/> );
      case 'pigeonbeans':
        return (<img width={"350"} height={"300"}  src={require('./images/pigeonbeans.jpg')}/> );
      case 'pomegranate':
        return (<img width={"350"} height={"300"}  src={require('./images/pomegranate.jpg')}/> );
      case 'rice crop':
      case 'rice':
        return (<img width={"350"} height={"300"}  src={require('./images/Rice crop.jpg')}/> );
      case 'watermelon':
        return (<img width={"350"} height={"300"}  src={require('./images/watermelon.jpg')}/> );    }

  }
  const onSubmit = (data: UserSubmitForm) => {
    console.log("smsmsm")
    console.log(JSON.stringify(data, null, 2));
    axios
      .post(baseURL + "/predict", data)
      .then((response) => {
        getImage(response.data)
        setModelData(response.data);
        
      });
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Potassium</label>
          <input
            type="number"
            {...register('Potassium')}
            className={`form-control ${errors.Potassium ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.Potassium?.message}</div>
        </div>

        <div className="form-group">
          <label>Nitrogen</label>
          <input
            type="number"
            {...register('Nitrogen')}
            className={`form-control ${errors.Nitrogen ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.Nitrogen?.message}</div>
        </div>

        <div className="form-group">
          <label>Phosporus</label>
          <input
            type="number"
            {...register('Phosporus')}
            className={`form-control ${errors.Phosporus ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.Phosporus?.message}</div>
        </div>

        <div className="form-group">
          <label>Humidity</label>
          <input
            type="number"
            {...register('Humidity')}
            className={`form-control ${errors.Humidity ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.Humidity?.message}</div>
        </div>
        <div className="form-group">
          <label>Ph</label>
          <input
            type="number"
            {...register('Ph')}
            className={`form-control ${errors.Ph ? 'is-invalid' : ''
              }`}
          />
          <div className="invalid-feedback">
            {errors.Ph?.message}
          </div>
        </div>
        <div className="form-group">
          <label>Rainfall</label>
          <input
            type="number"
            {...register('Rainfall')}
            className={`form-control ${errors.Rainfall ? 'is-invalid' : ''
              }`}
          />
          <div className="invalid-feedback">
            {errors.Rainfall?.message}
          </div>
        </div>
        <div className="form-group">
          <label>Temperature</label>
          <input
            type="number"
            {...register('Temperature')}
            className={`form-control ${errors.Temperature ? 'is-invalid' : ''
              }`}
          />
          <div className="invalid-feedback">
            {errors.Temperature?.message}
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Get Crops
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
      {modelData && modelData?.result ? <><p>{"As per the details provided " + modelData?.result + " is the best crop for you."}
      </p>
      {getImage(modelData)}
      </> : null}
    </div>
  );
};

export default App;
