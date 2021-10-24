import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core'
import QRCode from 'qrcode'
import QrReader from 'react-qr-reader';
export default function App() {

    const [ text, setText ] = useState('')
    const [ imageUrl, setImageUrl ] = useState('')
    const [ scanResultFile, setScanResultFile ] = useState('')
    const [ scanResultWebCam, setScanResultWebCam ] = useState('')
    const classes = useStyles()
    const qrRef = useRef(null)

    async function generateQrCode(text){
        try {
            const response = await QRCode.toDataURL(text)
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }

    function handleErrorFile(error){
        console.log(error)
    }

    function handleScanFile(result){
        if (result) {
            setScanResultFile(result)
        }
    }

    function onScanFile(){
      qrRef.current.openImageDialog()
    }


    function handleErrorWebCam(error){
        console.log(error)
    }
    function handleScanWebCam(result){
        if (result) {
            scanResultWebCam(result)
        }
    }
   

    return (
        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download & Scan QR Code with reactJS</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <TextField label="Enter Text Here" onChange={e => setText(e.target.value)}/>
                            <Button className={classes.btn} variant="contained" color="primary" onClick={() => generateQrCode(text)}>Generete</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl !== '' && (
                                <a href={imageUrl} download>
                                    <img src={imageUrl} alt="qrcode image"/>
                                </a>
                                )
                            }
                                
                        </Grid> 

                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Button className={classes.btn} variant="contained" color="secondary" onClick={() => onScanFile()}>Scan Qr Code</Button>
                            <QrReader
                                ref={qrRef}
                                delay={300}
                                style={{width: '100%'}}
                                onError={handleErrorFile}
                                onScan={handleScanFile}
                                legacyMode
                            />
                            <h3>Scanned Code: {scanResultFile}</h3>
                        </Grid>

                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                            <h3>Qr Code Scan by Web Cam</h3>
                            <QrReader
                             
                                delay={300}
                                style={{width: '100%'}}
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}
                               
                            />
                             <h3>Scanned by WebCam Code: {scanResultWebCam}</h3>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles( theme => ({
    container:{
        marginTop: 10,
    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3f51b5',
        color: '#FFF',
        padding: 20,
    },
    btn:{
        marginTop: 10,
        marginBottom: 20,
    }
}))
