"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '../../lib/api';
import ModelInputForm from '@/app/components/ModelInputForm';
import ModelOutput from '@/app/components/ModelOutput';
import Loader from '@/app/components/Loader';
import Error from '@/app/components/Error';

export default function ModelSpacePage({ params }) {
  const { id } = params;
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(null);
  const [apiTime, setApiTime] = useState(null);

  useEffect(() => {
    async function fetchModel() {
      try {
        const response = await axios.get(`/model-spaces/${id}`);
        setModel(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchModel();
  }, [id]);

  const handlePredict = async (inputData) => {
    setLoading(true);
    try {
      const startTime = Date.now();
      const response = await axios.post(`/model-spaces/${id}/predict`, inputData);
      const endTime = Date.now();
      setOutput(response.data.data);
      setApiTime(endTime - startTime);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{model.name}</h1>
      <p className="mb-6">{model.description}</p>
      <ModelInputForm inputs={model.inputs} onPredict={handlePredict} />
      {output && <ModelOutput outputs={model.outputs} data={output} time={apiTime} />}
    </div>
  );
}
