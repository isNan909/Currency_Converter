import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import axios from 'axios';

import spinner from '../images/spinner.svg';
import flag from '../images/flag.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Converterapp() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedOne, setSelectedOne] = useState([]);
  const [selectedTwo, setSelectedTwo] = useState([]);
  const [allList, setAllList] = useState([]);
  const [amount, setAmount] = useState('');

  const onSubmit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    mapCurrencyData();
    // eslint-disable-next-line
  }, []);

  async function getCurrencyData() {
    try {
      const response = await axios.get('https://xecdapi.xe.com/v1/currencies', {
        auth: {
          username: USERNAME,
          password: PASSWORD,
        },
      });
      const currencies = await response.data;
      return currencies;
    } catch (err) {
      console.log(`Unable to fetch curriencies: ${err}`);
    }
  }

  async function getCountriesData() {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all');
      const flags = await response.data;
      return flags;
    } catch (err) {
      console.log(`Unable to fetch country flags: ${err}`);
    }
  }

  async function mapCurrencyData() {
    const currencyData = await getCurrencyData();
    const countriesData = await getCountriesData();
    let countryListWithFlag = currencyData.currencies.map((obj) => {
      let countryFlag = countriesData.find(
        (country) => country.currencies[0].code === obj.iso
      );
      if (!countryFlag)
        return {
          ...obj,
          flag: flag,
        };
      return { ...obj, flag: countryFlag.flag };
    });
    setSelectedOne(countryListWithFlag[7]);
    setSelectedTwo(countryListWithFlag[149]);
    setAllList(countryListWithFlag);
    setIsLoaded(false);
  }

  return (
    <div>
      {isLoaded ? (
        <>
          <div className="animate-spin h-10 w-10 m-auto mt-14">
            <img src={spinner} alt="spinner loading" />
          </div>
        </>
      ) : (
        <>
          <section className="pt-14 bg-white px-6 pb-14 shadow">
            <h1 className="text-black text-2xl mb-10 font-semibold">
              Currency Exchange Rate
            </h1>
            <form onSubmit={onSubmit}>
              <div className="flex flex-row mb-6 gap-9 items-end">
                <div className="flex-1">
                  <label
                    className="font-bold text-sm mb-3 block"
                    htmlFor="text"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2"
                    value={amount}
                    size="lg"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex-1">
                  <Listbox value={selectedOne} onChange={setSelectedOne}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="font-bold text-sm mb-3 block">
                          From
                        </Listbox.Label>
                        <div className="mt-1 relative">
                          <Listbox.Button className="w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <span className="flex items-center">
                              <img
                                src={selectedOne.flag}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="ml-3 block truncate">
                                {selectedOne.currency_name}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {allList.map((list, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? 'text-white bg-green-600'
                                        : 'text-gray-900',
                                      'cursor-default select-none relative py-2 pl-3 pr-9'
                                    )
                                  }
                                  value={list}
                                >
                                  {({ selectedOne, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <img
                                          src={list.flag}
                                          alt=""
                                          className="flex-shrink-0 h-6 w-6 rounded-full"
                                        />
                                        <span
                                          className={classNames(
                                            selectedOne
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'ml-3 block truncate'
                                          )}
                                        >
                                          {list.iso},{list.currency_name}
                                        </span>
                                      </div>

                                      {selectedOne ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? 'text-white'
                                              : 'text-green-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                <div className="border-2 border-blue-100 rounded-full p-4 cursor-pointer hover:border-green-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 17"
                    aria-hidden="true"
                    className="w-4 h-4 text-green-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <Listbox value={selectedTwo} onChange={setSelectedTwo}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block font-bold text-sm mb-3">
                          To
                        </Listbox.Label>
                        <div className="mt-1 relative">
                          <Listbox.Button className="w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <span className="flex items-center">
                              <img
                                src={selectedTwo.flag}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="ml-3 block truncate">
                                {selectedTwo.currency_name}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {allList.map((list, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? 'text-white bg-green-600'
                                        : 'text-gray-900',
                                      'cursor-default select-none relative py-2 pl-3 pr-9'
                                    )
                                  }
                                  value={list}
                                >
                                  {({ selectedTwo, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <img
                                          src={list.flag}
                                          alt=""
                                          className="flex-shrink-0 h-6 w-6 rounded-full"
                                        />
                                        <span
                                          className={classNames(
                                            selectedTwo
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'ml-3 block truncate'
                                          )}
                                        >
                                          {list.iso},{list.currency_name}
                                        </span>
                                      </div>

                                      {selectedTwo ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? 'text-white'
                                              : 'text-green-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <div></div>
                <div>
                  <button className="uppercase inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-green-500 hover:bg-green-600">
                    Convert
                  </button>
                </div>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
}

export default Converterapp;
