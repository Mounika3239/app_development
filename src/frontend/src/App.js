// App.js
import React, { useState } from 'react';
import './App.css'
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AlertTitle from '@mui/material/AlertTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';



function App() {
    const [formData, setFormData] = useState({
        Age: '1',
        BMI: '',
        Chol: false,
        cholesterolCheck: 1,
        isSmoker: false,
        physicalActivity: false,
        hasHeartDisaseorAttack: false,
        generalHealth: 0,
        mentalHealth: 1,
        consumesFruits: false,
        Veggies: false,
        HvyAlcoholComsump: false,
        DiffWalk: false,
        Stroke: false,
        physicalHealth: 1,
        Sex: null,
        BMI_Group: '',
        HighBP: false,
        Age_Group: 0,
    });
    const [data, setData] = useState();

    const valuetext = (value) => `${value}°C`;

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const [value, setValue] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [inputType, setInputType] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const homePage = () => {
        setCurrentStep(0);
        setCurrentPage(1);
        setFormData({
            Age: '1',
            BMI: '',
            Chol: false,
            isSmoker: false,
            cholesterolCheck: 1,
            consumesFruits: false,
            Veggies: false,
            hasHeartDisaseorAttack: false,
            HvyAlcoholComsump: false,
            physicalActivity: false,
            physicalHealth: 1,
            DiffWalk: false,
            HighBP: false,
            generalHealth: 0,
            mentalHealth: 1,
            Stroke: false,
            Sex: null,
            BMI_Group: '',
            Age_Group: 0,
        });
    };

    const updateFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    

    const calculateBMIGroup = () => {
        const bmiBins = [12, 25, 30, 40, 100]; 
        if (formData.BMI < bmiBins[0]) return 1; 
        if (formData.BMI >= bmiBins[0] && formData.BMI < bmiBins[1]) return 1; 
        if (formData.BMI >= bmiBins[1] && formData.BMI < bmiBins[2]) return 2;
        if (formData.BMI >= bmiBins[2] && formData.BMI < bmiBins[3]) return 3; 
        if (formData.BMI >= bmiBins[3] && formData.BMI < bmiBins[4]) return 4;
        if (formData.BMI >= bmiBins[4]) return 4;        
    };

    // sending input data to backend
    const BackendData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const dataRes = await response.json();
            console.log(dataRes['predictions'][0])
            setData(dataRes['predictions'][0]);

        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };


    return (
        <div className='bg p-3' style={{ height: '100vh' }}>
            {
                currentPage == 0 &&
                <div >
                    <Home setInputType={setInputType} setCurrentPage={setCurrentPage} />
                </div>
            }

            {
                currentPage == 1 &&
                <div className='container w-75 p-4 pt-0' style={{ height: '90vh' }}>
                    <div className='d-flex justify-content-start'>
                    <div className='w-25' style={{ marginLeft: "0px" }}>

                        <button className='btn btn-sm btn-danger m-0 mt-2 mx-3 d-flex justify-content-center align-items-center' onClick={() => homePage()} style={{ width: "95px", height: "35px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                            </svg>
                            <div className='mx-1'> Home</div>
                        </button>
                    </div>
                        <h4 className="m-4 text-center myfont">Diabetes Risk Analyzer
                        </h4>
                    </div>

                    <hr></hr>
                    {
                        inputType == 1 &&
                        <div className='d-flex flex-column justify-content-center bg-form p-5 myshadow'>
                            <form className='form mx-auto row' onSubmit={BackendData}>
                                        <React.Fragment >
                                            {
                                                currentStep == 0 &&
                                                <div className='m-5 mb-0'>
                                                    <div className='d-flex justify-content-center'>
                                                    <label>
                                                        <TextField type='number'
                                                            id="age"
                                                            label="Age"
                                                            variant="outlined"
                                                            name="Age"
                                                            value={formData.Age}
                                                            onChange={updateFormData}
                                                            required
                                                            />
                                                    </label>

                                                    <label>
                                                        <FormControl style={{ width: '140px' }}>
                                                            <InputLabel id="sexId">Gender</InputLabel>
                                                            <Select
                                                                labelId="sexId"
                                                                id="sexh"
                                                                value={formData.Sex}
                                                                label="Sex"
                                                                name='Sex'
                                                                onChange={updateFormData}
                                                                autoWidth
                                                            >
                                                                <MenuItem value={0}>Male</MenuItem>
                                                                <MenuItem value={1}>Female</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </label>

                                                    <label>
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="BMI"
                                                            variant="outlined"
                                                            name="BMI"
                                                            value={formData.BMI}
                                                            onChange={updateFormData} />
                                                        
                                                    </label>

                                                    <label>
                                                        <TextField 
                                                            id="outlined-basic"
                                                            label="BMI Group"
                                                            variant="outlined"
                                                            name="BMI Group"
                                                            value={formData.BMI_Group = calculateBMIGroup()} aria-readonly
                                                            onChange={updateFormData} />
                                                    </label>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        {/* Left Div */}
                                                        <div className="d-flex flex-column align-items-start" style={{marginLeft: '60px', width: '48%' }}>
                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.Chol}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "Chol",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="Chol"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label=" Do you have high cholesterol?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.HighBP}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "HighBP",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="HighBP"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you have high blood pressure?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.Stroke}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "Stroke",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="Stroke"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Have you ever had a stroke?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.hasHeartDisaseorAttack}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "hasHeartDisaseorAttack",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="hasHeartDisaseorAttack"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you have heart disease?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.consumesFruits}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "consumesFruits",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="consumesFruits"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you eat fruits regularly?"
                                                                />
                                                            </label>
                                                        </div>

                                                        {/* Right Div */}
                                                        <div className="d-flex flex-column align-items-start" style={{ width: '48%' }}>
                                                            

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.HvyAlcoholComsump}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "HvyAlcoholComsump",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="HvyAlcoholComsump"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you drink alcohol heavily?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.isSmoker}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "isSmoker",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="isSmoker"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you smoke cigarettes?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.DiffWalk}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "DiffWalk",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="DiffWalk"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you have walking difficulties?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.physicalActivity}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "physicalActivity",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="physicalActivity"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Regular Physical Activity?"
                                                                />
                                                            </label>

                                                            <label>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                                            checked={formData.Veggies}
                                                                            onChange={(e) => updateFormData({
                                                                                target: {
                                                                                    name: "Veggies",
                                                                                    value: e.target.checked,
                                                                                },
                                                                            })}
                                                                            name="Veggies"
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                    label="Do you consume Veggies?"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                        <div className="form-group">
                                                            <label>Physical Health in Past 30 Days(1-Excellent, 30-Poor):</label>
                                                            <input
                                                                type="range"
                                                                min="1"
                                                                max="30"
                                                                step="1"
                                                                value={formData.physicalHealth}
                                                                name="physicalHealth"
                                                                onChange={updateFormData}
                                                                className="form-range"
                                                            />
                                                            <div className="d-flex justify-content-between mt-2">
                                                                {Array.from({ length: 30 }, (_, i) => (
                                                                    <span key={i + 1} style={{ fontSize: '0.75rem' }}>
                                                                        {i + 1}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Family History of Overweight:</label>
                                                            <input
                                                                type="range"
                                                                min="1"
                                                                max="30"
                                                                step="1"
                                                                value={formData.mentalHealth}
                                                                name="mentalHealth"
                                                                onChange={updateFormData}
                                                                className="form-range"
                                                            />
                                                            <div className="d-flex justify-content-between mt-2">
                                                                {Array.from({ length: 30 }, (_, i) => (
                                                                    <span key={i + 1} style={{ fontSize: '0.75rem' }}>
                                                                        {i + 1}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    <div className='d-flex justify-content-center border rounded shadow m-5"'>
                                                        <label >
                                                            <p className='h5' component="legend"> How do you rate your general health?</p>
                                                            <Rating
                                                                size="large"
                                                                style={{ marginLeft: 0 }}
                                                                name="generalHealth"
                                                                value={formData.generalHealth}
                                                                onChange={(event, newValue) => {
                                                                    setValue(newValue);
                                                                    setFormData({
                                                                        ...formData,
                                                                        ['generalHealth']: newValue,
                                                                    });

                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            }{
                                                currentStep == 1 &&
                                                <div className='m-5 mb-0'>


                                                    {data == 1 &&
                                                        <div>
                                                            <Alert variant="filled" severity="error" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                                <AlertTitle>WARNING</AlertTitle>
                                                                HIGH CHANCES OF GETTING DIABETES!!!!!
                                                            </Alert>

                                                        </div>
                                                    }

                                                    {data == 0 &&
                                                        <Alert variant="filled" severity="success" style={{ width: "100%", fontSize: '1.2rem', padding: '15px' }}>
                                                            <AlertTitle>CONGRATS</AlertTitle>
                                                            LOW CHANCES OF GETTING DIABETES!!!!!
                                                        </Alert>
                                                    }


                                                    <div className='text-center h3 mx-3'>Overall Health Report</div>
                                                    <hr></hr>
                                                    <div>
                                                        {formData['generalHealth'] <= 3 ?
                                                            <Alert severity="warning">
                                                                To prevent diabetes, focus on maintaining good overall health and prioritizing your well-being.
                                                            </Alert>
                                                            :
                                                            <Alert severity='success'>
                                                                Kudos for prioritizing and maintaining overall health and well-being.
                                                            </Alert>

                                                        }
                                                        {
                                                            parseInt(formData['BMI']) - 28 > parseInt(formData['BMI']) - 31 ?
                                                                <Alert severity="warning">
                                                                    Your BMI is high which increases diabetes risk. Focus on diet and exercise to improve health.
                                                                </Alert>
                                                                :
                                                                <Alert severity='success'>
                                                                    Your BMI is in the Healthy Weight category. Maintaining a healthy BMI lowers your risk of diabetes and other health issues. Keep up your good habits to stay fit and healthy!
                                                                </Alert>
                                                        }

                                                        {formData['Age'] >= 7 &&
                                                            <Alert severity="warning">
                                                                As you grow older, especially after the age of 50, the risk of developing diabetes increases.
                                                            </Alert>
                                                        }

                                                        {formData['cholesterolCheck'] == true ?
                                                            <Alert severity="warning">
                                                                Having high cholesterol can increase your risk of diabetes. Focus on a healthy lifestyle to keep your cholesterol in check and lower the risk. If you’re unsure, talk to a healthcare professional for personalized advice.
                                                            </Alert>
                                                            :
                                                            <Alert severity="success">
                                                                Keep your cholesterol levels in check to stay protected from diabetes. Since your levels are already healthy, continue following a good lifestyle to maintain them. For tailored advice, consider speaking with a healthcare professional.
                                                            </Alert>


                                                        }


                                                        {formData['HighBP'] == true ?
                                                            <Alert severity="warning">
                                                                High blood pressure can increase your risk of diabetes. Maintaining a healthy lifestyle can help manage it and support your overall well-being. For specific advice, consult a healthcare professional.
                                                            </Alert>
                                                            :
                                                            <Alert severity='success'>
                                                                A healthy lifestyle helps reduce diabetes risk from high blood pressure. Stay active, eat well, and consult a doctor for personalized advice.
                                                            </Alert>
                                                        }

                                                        {formData['PhysActivioty'] == 0 ?
                                                            <Alert severity="warning">
                                                                Lack of regular physical activity increases the risk of diabetes. Make exercise a priority to improve your health.
                                                            </Alert>
                                                            :
                                                            <Alert severity='success'>
                                                                Great job staying physically active! Regular exercise helps lower risks, regulate blood sugar, and improve insulin sensitivity. Keep it up!
                                                            </Alert>
                                                        }

                                                        {
                                                            formData['consumesFruits'] == false || formData['Veggies'] == true ?
                                                                <Alert severity="warning">
                                                                    Add more fruits and vegetables to your diet. Their fiber, vitamins, and antioxidants can help prevent diabetes and improve overall health.
                                                                </Alert>
                                                                :
                                                                <Alert severity='success'>
                                                                    Well done on maintaining a balanced diet with plenty of fruits and vegetables! It’s a great step towards preventing diabetes and staying healthy.
                                                                </Alert>
                                                        }

                                                        {
                                                            formData['isSmoker'] == true || formData['HvyAlcoholComsump' == true] ?
                                                                <Alert severity="warning">
                                                                    Smoking and alcohol can raise the risk of diabetes by causing insulin resistance and blood sugar imbalances. Limiting these habits is crucial for your health.
                                                                </Alert> :
                                                                <Alert severity='success'>
                                                                    Great job avoiding smoking and drinking! It’s a powerful step in reducing the risk of diabetes and improving overall health.
                                                                </Alert>
                                                        }
                                                        {formData['Stroke'] ? (
                                                            <Alert severity="warning">
                                                                Experiencing a stroke can increase the risk of developing diabetes. It's important to focus on a healthy diet, regular exercise, and consistent medical checkups to manage your health effectively. Consult a healthcare professional for personalized guidance.
                                                            </Alert>
                                                        ) : (
                                                            <Alert severity="success">
                                                                No history of stroke is a positive sign for reducing diabetes risk. Keep maintaining a healthy lifestyle to protect your overall well-being. For further advice, consult a healthcare professional if needed.
                                                            </Alert>
                                                        )}

                                                    </div>
                                                    <button className='btn bg-pink text-white btn-lg btn-block m-2' onClick={() => setCurrentPage(2)} style={{ float: 'right', width: "140px" }}> Analytics</button>
                                                </div>
                                            }

                                            {
                                                currentStep == 0 &&
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btn bg-pink text-white btn-lg btn-block m-2' style={{ width: "15%" }} onClick={(e) => {
                                                        nextStep()
                                                        BackendData(e)
                                                    }}>
                                                        SUBMIT
                                                    </button>
                                                </div>

                                            }                                       
                                        </React.Fragment>
                            </form>

                        </div>
                    }
                    
                </div>
            }
        {
            currentPage == 2 &&
            <div>
                <div className='w-75 mx-auto'>
                    <div className='d-flex justify-content-start'>
                        <div className='' style={{ marginLeft: "0px" }}>

                            <button className='btn btn-sm btn-danger m-0 mt-2 mx-3 d-flex justify-content-center align-items-center' onClick={() => homePage()} style={{ width: "95px", height: "35px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                </svg>
                                <div className='mx-1'> Home</div>
                            </button>
                        </div>
                        <h4 className="text-center myfont display-4" style={{ marginLeft: "150px" }}>
                            Diabetes Risk Analyzer
                        </h4>
                    </div>

                    <hr className='m-3'></hr>
                </div>

                <Analytics />
            </div>
        }

        </div >
    );
}

export default App;

