'use client'

import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import Input from './components/Input';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import Button from './components/Button';
import Card from './components/card';
import Loader from './components/Loader';
import { OptionProp, statusFilter, shortTitleFilter } from './types';
import Dropdown from './components/Dropdown';
import { MultiValue } from 'react-select';

export default function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<MultiValue<OptionProp> | null>(null);
  const [selectedShortTitle, setSelectedShortTitle] = useState<MultiValue<OptionProp> | null>(null);
  const [sessionsData, setSessionsData] = useState<any>([]);

  const onClearFilter = () => {
    setSelectedStatus([]);
    setSelectedShortTitle([]);
    setIsLoading(true);
    axios.get('/api/sessions')
    .then((data) => {
      setSessionsData(data.data)
    })
    .catch(() => {
      // toast.error('Something went wrong.');
      console.log("error");
    })
    .finally(() => {
      setIsLoading(false);
    })
  }


  const onSubmit = () => {
    const url = 'api/sessions';
    const status =selectedStatus && selectedStatus.map((item) => item.value).join(',');
    const shortTitle =selectedShortTitle && selectedShortTitle.map((item) => item.value).join(',');
    const statusParam = status ? `status=${status}` : '';
    const shortTitleParam = shortTitle ? `short_title=${shortTitle}` : '';
    let urlRequest = url;

    if (statusParam && shortTitleParam) {
      urlRequest = `${url}?${statusParam}&${shortTitleParam}`;
    } else if (statusParam) {
      urlRequest = `${url}?${statusParam}`;
    } else if (shortTitleParam) {
      urlRequest = `${url}?${shortTitleParam}`;
    }
    setIsLoading(true);
    axios.get(urlRequest)
    .then((data) => {
      setSessionsData(data.data)
    })
    .catch(() => {
      console.log("error");
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/sessions')
    .then((data) => {
      setSessionsData(data.data)
    })
    .catch(() => {
      // toast.error('Something went wrong.');
      console.log("error");
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [])

  const onSelecStatus = (options: MultiValue<OptionProp>) => {
    setSelectedStatus(options)
  }

  const onSelectShortTitle = (options: MultiValue<OptionProp>) => {
    setSelectedShortTitle(options)
  }

  return (
    <ClientOnly>
      <div className="fixed w-full bg-white z-10 shadow-sm">
        <div
          className="
            py-4
            border-b-[1px]
          "
        >
          <Container>
            <div
              className="
                grid
                grid-cols-2
                items-center
                justify-between
                gap-3
                md:gap-0
              "
            >
              <div className="flex flex-auto gap-4 pr-2">
                <Dropdown value={selectedShortTitle} label="Short Title" options={shortTitleFilter} onSelect={onSelectShortTitle}/>
                <Dropdown value={selectedStatus} label="Status" options={statusFilter} onSelect={onSelecStatus}/>
              </div>
              <div className="flex flex-row justify-end w-full py-2 gap-2">
                  <Button
                    label="Clear Filter"
                    outline
                    onClick={onClearFilter}
                    disabled={isLoading}
                  />
                  <Button
                    label="Filter"
                    onClick={onSubmit}
                    disabled={isLoading}
                  />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="pb-20 pt-28">
        {isLoading ? <Loader /> :
          <Container>
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
              "
            >
              {!isLoading && sessionsData.map((listing: any) => (
                <Card
                  key={listing.id}
                  data={listing}
                />
              ))}
            </div>
          </Container>
        }
      </div>
    </ClientOnly>
  )
}
