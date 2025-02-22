import React, { useState, useEffect, useRef } from 'react';
import { Country, State, City } from 'country-state-city';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageIcon, Upload } from 'lucide-react';

const RegistrationForm = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [logoImage, setLogoImage] = useState(null);
    const [signatureImage, setSignatureImage] = useState(null);
    const [isGstRegistered, setIsGstRegistered] = useState(false);
    const logoInputRef = useRef(null);
    const signatureInputRef = useRef(null);

    const INDUSTRY_TYPES = [
        "fabric & textiles",
        "agriculture",
        "services",
        "e-commerce",
        "food & beverages",
        "Travel & Tourism",
        "Other"
    ];

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry));
            setSelectedState("");
            setSelectedCity("");
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            setCities(City.getCitiesOfState(selectedCountry, selectedState));
            setSelectedCity("");
        }
    }, [selectedState, selectedCountry]);

    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (type === 'logo') {
                    setLogoImage(e.target.result);
                } else {
                    setSignatureImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div 
                            className="h-32 w-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                            onClick={() => logoInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={logoInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'logo')}
                            />
                            {logoImage ? (
                                <img src={logoImage} alt="Company Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <div className="text-blue-500 text-sm">Upload Logo</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <Label>Company Phone Number</Label>
                        <Input type="tel" placeholder="7972944562" className="mt-1" />
                    </div>

                    <div>
                        <Label>Company E-Mail</Label>
                        <Input type="email" placeholder="Enter company e-mail" className="mt-1" />
                    </div>

                    {/* Address Details */}
                    <div className="col-span-1 md:col-span-2">
                        <Label>Billing Address</Label>
                        <Input type="text" placeholder="Enter Billing Address" className="mt-1" />
                    </div>

                    {/* Country Selection */}
                    <div>
                        <Label>Country</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((country) => (
                                    <SelectItem key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* State Selection */}
                    <div>
                        <Label>State</Label>
                        <Select value={selectedState} onValueChange={setSelectedState}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                                {states.map((state) => (
                                    <SelectItem key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* City Selection */}
                    <div className="col-span-1 md:col-span-2">
                        <Label>City</Label>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.map((city) => (
                                    <SelectItem key={city.name} value={city.name}>
                                        {city.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Pincode</Label>
                        <Input type="text" placeholder="Enter Pincode" className="mt-1" />
                    </div>

                    {/* Business Details */}
                    <div className="col-span-1 md:col-span-2">
                        <Label>Industrial Type</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Please select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {INDUSTRY_TYPES.map((type, index) => (
                                    <SelectItem key={index} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Signature Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Label>Signature</Label>
                        <div 
                            className="mt-1 border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer relative overflow-hidden"
                            onClick={() => signatureInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={signatureInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'signature')}
                            />
                            {signatureImage ? (
                                <img src={signatureImage} alt="Signature" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <div className="text-blue-500">+ Add Signature</div>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Note: Terms & Conditions and Signature added below will be shown on your Invoices</p>
                    </div>

                 

                    {/* GST Registration */}
                    <div className="col-span-1 md:col-span-2">
                        <Label>Are you GST Registered?</Label>
                        <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="gst" 
                                    className="w-4 h-4" 
                                    onChange={() => setIsGstRegistered(true)}
                                    checked={isGstRegistered}
                                />
                                <span>Yes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="radio" 
                                    name="gst" 
                                    className="w-4 h-4"
                                    onChange={() => setIsGstRegistered(false)}
                                    checked={!isGstRegistered}
                                />
                                <span>No</span>
                            </div>
                        </div>
                    </div>

                    {/* Conditional GST Input */}
                    {isGstRegistered && (
                        <div className="col-span-1 md:col-span-2">
                            <Label>GST Number</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter GST Number" 
                                className="mt-1"
                                pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                            />
                            <p className="text-sm text-gray-500 mt-1">Format: 22AAAAA0000A1Z5</p>
                        </div>
                    )}

                    {/* E-Invoicing Toggle */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                        <div>
                            <span className="font-medium">Enable e-Invoicing</span>
                            <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">New</span>
                        </div>
                        <Switch />
                    </div>
                </div>
                
                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <Button className="bg-green-600 hover:bg-green-700">Submit</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegistrationForm;