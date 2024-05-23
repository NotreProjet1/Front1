import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ certificateDetails }) => {
    const certificateRef = useRef();

    const handleDownloadCertificate = () => {
        html2canvas(certificateRef.current, { scrollY: -window.scrollY }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificate.pdf');
        });
    };

    return (
        <div ref={certificateRef} className="certificate">
            <h2>Certificat de réussite</h2>
            <p>Délivré à : {certificateDetails.firstName} {certificateDetails.lastName}</p>
            <p>Date : {certificateDetails.date}</p>
            <p>Entreprise : {certificateDetails.companyName}</p>
            <p>Score : {certificateDetails.percentageScore}%</p>
            <button onClick={handleDownloadCertificate}>Télécharger</button>
        </div>
    );
};

export default Certificate;
